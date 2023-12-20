import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { serverError, authError } from "../assets/responseMessages";

dotenv.config();

const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || "";

const auth = (req: any, res: any, next: any) => {
  try {
    const refreshToken = req.cookies.refreshtoken;
    if (!refreshToken) return res.status(401).json(authError);
    jwt.verify(
      refreshToken,
      JWT_REFRESH_TOKEN_SECRET,
      (err: any, user: any) => {
        if (err) return res.status(401).json(authError);
        req.user = user;
        next();
      }
    );
  } catch (err) {
    return res.status(500).json(serverError);
  }
};

export default auth;
