import { Response } from "express";
import { createRefreshToken } from "./createToken";

const sendAuthToken = (res: Response, userId:string) => {
    // Create refresh token
    const refreshToken = createRefreshToken({
      userId: userId,
    });

  res.cookie("refreshtoken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

}

export default sendAuthToken;