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
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const createToken_1 = require("utils/auth/createToken");
const sendEmail_1 = __importDefault(require("utils/sendEmail"));
const validateEmail_1 = __importDefault(require("utils/auth/validateEmail"));
const generateAndSendAuthTokens_1 = __importDefault(require("utils/auth/generateAndSendAuthTokens"));
const category_1 = __importDefault(require("models/category"));
const user_1 = __importDefault(require("models/user"));
const responseMessages_1 = require("constants/responseMessages");
const router = (0, express_1.Router)();
const PASSWORD_SECRET = process.env.PASSWORD_SECRET || "";
const CLIENT_URL = process.env.CLIENT_URL || "";
const JWT_RESET_PASSWORD_REFRESH_TOKEN_SECRET = process.env.JWT_RESET_PASSWORD_REFRESH_TOKEN_SECRET || "";
// REGISTER
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, email, password } = req.body;
        // Validate input fields
        if (!email || !password || !firstname || !lastname)
            return res.status(400).json(responseMessages_1.missingFields);
        // Validate password length
        if (password.length < 8)
            return res.status(400).json(responseMessages_1.minimumPasswordLengthError);
        // Validate email structure
        if (!(0, validateEmail_1.default)(email))
            return res.status(400).json(responseMessages_1.invalidEmailError);
        // Validate the email is not in use
        const user = yield user_1.default.findOne({ email: email });
        if (user)
            return res.status(400).json(responseMessages_1.duplicateEmailsError);
        // Create user
        const newUser = new user_1.default({
            lastname: lastname,
            firstname: firstname,
            email: email.toLowerCase(),
            password: crypto_js_1.default.AES.encrypt(password, PASSWORD_SECRET).toString(),
        });
        yield newUser.save();
        // Create default category
        const newCategory = new category_1.default({ title: "Tasks", userId: newUser._id });
        yield newCategory.save();
        // Set credentials ans send response
        (0, generateAndSendAuthTokens_1.default)(res, newUser._id);
        res.status(200).json("Register Success!");
    }
    catch (err) {
        return res.status(500).json(responseMessages_1.serverError);
    }
}));
// LOGIN
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate input fields
        if (!email || !password)
            return res.status(400).json(responseMessages_1.missingFields);
        // Find user
        const user = yield user_1.default.findOne({ email: email });
        if (!user)
            return res.status(400).json(responseMessages_1.wrongCredentialsError);
        // Verify password
        const hashedPassword = crypto_js_1.default.AES.decrypt(user.password, PASSWORD_SECRET);
        const userPassword = hashedPassword.toString(crypto_js_1.default.enc.Utf8);
        if (userPassword !== password)
            return res.status(400).json(responseMessages_1.wrongCredentialsError);
        // Set credentials and send response
        (0, generateAndSendAuthTokens_1.default)(res, user._id);
        res.status(200).json("Login Success!");
    }
    catch (err) {
        return res.status(500).json(responseMessages_1.serverError);
    }
}));
// LOGOUT
router.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("refreshtoken");
        res.clearCookie("accesstoken");
        return res.status(200).json("Logged out.");
    }
    catch (err) {
        return res.status(500).json(responseMessages_1.serverError);
    }
}));
// FORGOT PASSWORD
router.post("/forgot-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        // Validate input
        if (!email)
            return res.status(400).json("Please fill in the email field.");
        // Validate email
        const user = yield user_1.default.findOne({ email });
        if (!user)
            return res.status(400).json(responseMessages_1.wrongCredentialsError);
        // Create token and URL
        const token = (0, createToken_1.createResetPasswordToken)({ email: user.email });
        const url = `${CLIENT_URL}/reset-password/${token}`;
        // Send email
        (0, sendEmail_1.default)(email, url);
        res.status(200).json("Please check your email for the reset link.");
    }
    catch (err) {
        return res.status(500).json(responseMessages_1.serverError);
    }
}));
// RESET PASSWORD
router.post("/reset-password/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        if (password.length < 8)
            return res.status(400).json(responseMessages_1.minimumPasswordLengthError);
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
        res.status(200).json("Password has been changed successfully!");
    }
    catch (err) {
        return res.status(500).json(responseMessages_1.serverError);
    }
}));
// LOGIN FAILED
router.get("/failed", (req, res) => {
    res.status(401).json("Failed login attempt.");
});
// LOGIN SUCCESS
router.get("/success", (req, res) => {
    if (req.user) {
        const userId = req.user;
        (0, generateAndSendAuthTokens_1.default)(res, userId);
        res.status(200).json("Login success!");
    }
});
// GOOGLE OAUTH2
router.get("/google", passport_1.default.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
}));
router.get("/google/callback", passport_1.default.authenticate("google", {
    session: false,
    failureRedirect: "/auth/failed",
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    (0, generateAndSendAuthTokens_1.default)(res, userId);
    res.redirect(CLIENT_URL + "/redirect");
}));
exports.default = router;
