"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResetPasswordToken =
  exports.createAccessToken =
  exports.createRefreshToken =
    void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || "";
const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || "";
const JWT_RESET_PASSWORD_REFRESH_TOKEN_SECRET =
  process.env.JWT_RESET_PASSWORD_REFRESH_TOKEN_SECRET || "";
const createRefreshToken = (payload) => {
  return jsonwebtoken_1.default.sign(payload, JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
exports.createRefreshToken = createRefreshToken;
const createAccessToken = (payload) => {
  return jsonwebtoken_1.default.sign(payload, JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
exports.createAccessToken = createAccessToken;
const createResetPasswordToken = (payload) => {
  return jsonwebtoken_1.default.sign(
    payload,
    JWT_RESET_PASSWORD_REFRESH_TOKEN_SECRET,
    {
      expiresIn: "15m",
    },
  );
};
exports.createResetPasswordToken = createResetPasswordToken;
