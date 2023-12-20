"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateEmail_1 = __importDefault(require("../utils/validateEmail"));
const user_1 = __importDefault(require("../models/user"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const createToken_1 = require("../utils/createToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
const PASSWORD_SECRET = process.env.PASSWORD_SECRET || "";
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || "";
const CLIENT_URL = process.env.CLIENT_URL || "";
const JWT_RESET_PASSWORD_REFRESH_TOKEN_SECRET = process.env.JWT_RESET_PASSWORD_REFRESH_TOKEN_SECRET || "";
// REGISTER
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!email || !password || !username)
            return res.status(400).json("Please fill in all fields.");
        if (!(0, validateEmail_1.default)(email))
            return res.status(400).json("Invalid email");
        const user = yield user_1.default.findOne({
            $or: [{ username: username }, { email: email }],
        });
        if (user) {
            return res
                .status(400)
                .json(`${user.email === email ? "Email" : "Username"} is already taken.`);
        }
        if (password.length < 8)
            return res.status(400).json("Password must be at least 8 characters.");
        // Create user
        const newUser = new user_1.default({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: crypto_js_1.default.AES.encrypt(password, PASSWORD_SECRET).toString(),
        });
        yield newUser.save();
        // Create refresh token
        const refreshToken = (0, createToken_1.createRefreshToken)({
            username: username,
            email: email,
        });
        // Send refresh token
        res.cookie("refreshtoken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(200).json("Register Success!");
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// LOGIN
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        const user = yield user_1.default.findOne({
            $or: [{ username: username }, { email: email }],
        });
        if (!user)
            return res.status(400).json("Wrong credentials!");
        // Verify password
        const hashedPassword = crypto_js_1.default.AES.decrypt(user.password, PASSWORD_SECRET);
        const userPassword = hashedPassword.toString(crypto_js_1.default.enc.Utf8);
        if (userPassword !== password)
            return res.status(401).json("Wrong credentials!");
        // Create refresh token
        const refreshToken = (0, createToken_1.createRefreshToken)({
            username: username,
            email: email,
        });
        // Send refresh token
        res.cookie("refreshtoken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(200).json("Login Success!");
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// LOGOUT
router.get("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("refreshtoken");
        return res.json("Logged out.");
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// FORGOT PASSWORD
router.post("/forgot-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user)
            return res.status(400).json("Email does not exit.");
        // Create and send access token
        const accessToken = (0, createToken_1.createResetPasswordToken)({ email: user.email });
        const url = `${CLIENT_URL}/reset-password/${accessToken}`;
        (0, sendEmail_1.default)(email, url);
        res.json("Please check your email for the reset link.");
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// RESET PASSWORD
router.post("/reset-password/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        if (password.length < 8)
            return res.status(400).json("Password must be at least 8 characters.");
        const resetPasswordToken = req.params.token;
        const user = jsonwebtoken_1.default.verify(resetPasswordToken, JWT_RESET_PASSWORD_REFRESH_TOKEN_SECRET);
        if (!user)
            return res.status(400).json("Invalid token.");
        if (typeof user === "string")
            return res.status(400).json("Invalid data type.");
        const email = user.email;
        const hashedPassword = crypto_js_1.default.AES.encrypt(password, PASSWORD_SECRET).toString();
        yield user_1.default.findOneAndUpdate({ email: email }, {
            password: hashedPassword,
        });
        res.json("Password has been changed successfully!");
    }
    catch (err) {
        return res.status(500).json("Invalid token.");
    }
}));
// LOGIN FAILED
router.get("/failed", (req, res) => {
    res.status(401).json("Failed login attempt.");
});
// LOGIN SUCCESS
router.get("/success", (req, res) => {
    res.status(200).json("Login Success!");
});
// GOOGLE OAUTH2
router.get("/google", passport_1.default.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
}));
router.get("/google/callback", passport_1.default.authenticate("google", {
    session: false,
    successRedirect: "/success",
    failureRedirect: "/failed",
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.user;
    res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    // res.redirect(CLIENT_URL + "/login-success");
    res.redirect(CLIENT_URL);
}));
exports.default = router;
