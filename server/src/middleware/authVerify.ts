import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { serverError, authError } from "../constants/responseMessages";
import generateAndSendAuthTokens from "../utils/auth/generateAndSendAuthTokens";

dotenv.config();

const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || "";
const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || "";

const auth = (req: any, res: any, next: any) => {
  try {
    /*
    if access token is valid: give permission
    else if access token is invalid: Check for refresh token
      if refresh token is valid: renew both access and refresh tokens, give permission
      else if refresh token if invalid: deny permission
    */

    const accessToken = req.cookies.accesstoken;
    jwt.verify(accessToken, JWT_ACCESS_TOKEN_SECRET, (err: any, user: any) => {
      if (err) {
        // check for refresh token when access token is invalid
        const refreshToken = req.cookies.refreshtoken;
        if (!refreshToken) return res.status(401).json(authError);
        jwt.verify(
          refreshToken,
          JWT_REFRESH_TOKEN_SECRET,
          (err: any, user: any) => {
            // if refresh token is invalid deny access
            if (err) return res.status(401).json(authError);
            // renew both tokens
            generateAndSendAuthTokens(res, user.userId);
            req.user = user;
            next();
          }
        );
      } else {
        req.user = user;
        next();
      }
    });
  } catch (err) {
    return res.status(500).json(serverError);
  }
};

export default auth;
