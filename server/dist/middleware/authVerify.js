"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const responseMessages_1 = require("constants/responseMessages");
const generateAndSendAuthTokens_1 = __importDefault(require("utils/auth/generateAndSendAuthTokens"));
dotenv_1.default.config();
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || "";
const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || "";
const auth = (req, res, next) => {
    try {
        /*
        if access token is valid: give permission
        else if access token is invalid: Check for refresh token
          if refresh token is valid: renew both access and refresh tokens, give permission
          else if refresh token if invalid: deny permission
        */
        const accessToken = req.cookies.accesstoken;
        jsonwebtoken_1.default.verify(accessToken, JWT_ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                // check for refresh token when access token is invalid
                const refreshToken = req.cookies.refreshtoken;
                if (!refreshToken)
                    return res.status(401).json(responseMessages_1.authError);
                jsonwebtoken_1.default.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET, (err, user) => {
                    // if refresh token is invalid deny access
                    if (err)
                        return res.status(401).json(responseMessages_1.authError);
                    // renew both tokens
                    (0, generateAndSendAuthTokens_1.default)(res, user.userId);
                    req.user = user;
                    next();
                });
            }
            else {
                req.user = user;
                next();
            }
        });
    }
    catch (err) {
        return res.status(500).json(responseMessages_1.serverError);
    }
};
exports.default = auth;
