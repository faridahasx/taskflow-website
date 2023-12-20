"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const responseMessages_1 = require("../assets/responseMessages");
dotenv_1.default.config();
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || "";
const auth = (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshtoken;
        if (!refreshToken)
            return res.status(401).json(responseMessages_1.authError);
        jsonwebtoken_1.default.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET, (err, user) => {
            if (err)
                return res.status(401).json(responseMessages_1.authError);
            req.user = user;
            next();
        });
    }
    catch (err) {
        return res.status(500).json(responseMessages_1.serverError);
    }
};
exports.default = auth;
