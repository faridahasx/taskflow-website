"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createToken_1 = require("./createToken");
const sendAuthToken = (res, userId) => {
    // Create refresh token
    const refreshToken = (0, createToken_1.createRefreshToken)({
        userId: userId,
    });
    res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
};
exports.default = sendAuthToken;
