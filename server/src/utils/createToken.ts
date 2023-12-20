import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || "";
const JWT_RESET_PASSWORD_REFRESH_TOKEN_SECRET =
  process.env.JWT_RESET_PASSWORD_REFRESH_TOKEN_SECRET || "";

export const createRefreshToken = (payload: { userId: string }) => {
  return jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const createResetPasswordToken = (payload: { email: string }) => {
  return jwt.sign(payload, JWT_RESET_PASSWORD_REFRESH_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
