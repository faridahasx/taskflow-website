"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createToken_1 = require("./createToken");
const generateAndSendAuthTokens = (res, userID) => {
    // Create tokens
    const refreshToken = (0, createToken_1.createRefreshToken)({
        userId: userID,
    });
    const accessToken = (0, createToken_1.createAccessToken)({
        userId: userID,
    });
    // Set cookies
    res.cookie("accesstoken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });
};
exports.default = generateAndSendAuthTokens;
