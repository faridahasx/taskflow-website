import { Response } from "express";
import { createRefreshToken, createAccessToken } from "./createToken";
import { IUserSchema } from "../../types/userTypes";

const generateAndSendAuthTokens = (
  res: Response,
  userID: IUserSchema["_id"]
) => {
  // Create tokens
  const refreshToken = createRefreshToken({
    userId: userID,
  });
  const accessToken = createAccessToken({
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

export default generateAndSendAuthTokens;
