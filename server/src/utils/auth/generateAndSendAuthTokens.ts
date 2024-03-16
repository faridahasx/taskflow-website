import { Response } from "express";
import { IUser } from "../../models/user";
import { createRefreshToken } from "./createToken";

const generateAndSendAuthTokens = (res:Response, userID: IUser['_id']) => {
    // Create refresh token
    const refreshToken = createRefreshToken({
        userId: userID,
      });
  
      // Send response
      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

}


export default generateAndSendAuthTokens