import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { IUser } from "../../models/user";
dotenv.config();

const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || "";
const JWT_RESET_PASSWORD_REFRESH_TOKEN_SECRET =
  process.env.JWT_RESET_PASSWORD_REFRESH_TOKEN_SECRET || "";

const JWT_ACCESS_TOKEN_SECRET =
  process.env.JWT_ACCESS_TOKEN_SECRET || "";

export const createRefreshToken = (payload: { userId: IUser['_id'] }) => {
  return jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "15d",
  });
};

export const createAccessToken = (payload: { userId: IUser['_id'] }) => {
  return jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

export const createResetPasswordToken = (payload: { email: string }) => {
  return jwt.sign(payload, JWT_RESET_PASSWORD_REFRESH_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
