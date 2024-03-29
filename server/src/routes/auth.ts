import { Request, Response, Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { createResetPasswordToken } from "../utils/auth/createToken";
import sendEmail from "../utils/sendEmail";
import validateEmail from "../utils/auth/validateEmail";
import User from "../models/user";
import {
  duplicateEmailsError,
  invalidEmailError,
  minimumPasswordLengthError,
  missingFields,
  serverError,
  wrongCredentialsError,
} from "../constants/responseMessages";
import generateAndSendAuthTokens from "../utils/auth/generateAndSendAuthTokens";
import { IUserSchema } from "../types/userTypes";

const router = Router();
const PASSWORD_SECRET = process.env.PASSWORD_SECRET || "";
const CLIENT_URL = process.env.CLIENT_URL || "";
const JWT_RESET_PASSWORD_REFRESH_TOKEN_SECRET =
  process.env.JWT_RESET_PASSWORD_REFRESH_TOKEN_SECRET || "";

// REGISTER
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Validate input fields
    if (!email || !password || !firstname || !lastname)
      return res.status(400).json(missingFields);

    // Validate password length
    if (password.length < 8)
      return res.status(400).json(minimumPasswordLengthError);

    // Validate email structure
    if (!validateEmail(email)) return res.status(400).json(invalidEmailError);

    // Validate the email is not in use
    const user = await User.findOne({ email: email });
    if (user) return res.status(400).json(duplicateEmailsError);

    // Create user
    const newUser = new User({
      lastname: lastname,
      firstname: firstname,
      email: email.toLowerCase(),
      password: CryptoJS.AES.encrypt(password, PASSWORD_SECRET).toString(),
    });
    await newUser.save();

    // Set credentials ans send response
    generateAndSendAuthTokens(res, newUser._id);
    res.status(200).json("Register Success!");
  } catch (err) {
    return res.status(500).json(serverError);
  }
});

// LOGIN
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) return res.status(400).json(missingFields);

    // Find user
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json(wrongCredentialsError);

    // Verify password
    const hashedPassword = CryptoJS.AES.decrypt(user.password, PASSWORD_SECRET);
    const userPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (userPassword !== password)
      return res.status(400).json(wrongCredentialsError);

    // Set credentials and send response
    generateAndSendAuthTokens(res, user._id);
    res.status(200).json("Login Success!");
  } catch (err) {
    return res.status(500).json(serverError);
  }
});

// LOGOUT
router.post("/logout", async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshtoken");
    res.clearCookie("accesstoken");
    return res.status(200).json("Logged out.");
  } catch (err) {
    return res.status(500).json(serverError);
  }
});

// FORGOT PASSWORD
router.post("/forgot-password", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    // Validate input
    if (!email) return res.status(400).json("Please fill in the email field.");

    // Validate email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json(wrongCredentialsError);

    // Create token and URL
    const token = createResetPasswordToken({ email: user.email });
    const url = `${CLIENT_URL}/reset-password/${token}`;

    // Send email
    sendEmail(email, url);
    res.status(200).json("Please check your email for the reset link.");
  } catch (err) {
    return res.status(500).json(serverError);
  }
});

// RESET PASSWORD
router.post("/reset-password/:token", async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    if (password.length < 8)
      return res.status(400).json(minimumPasswordLengthError);
    const resetPasswordToken = req.params.token;
    const user = jwt.verify(
      resetPasswordToken,
      JWT_RESET_PASSWORD_REFRESH_TOKEN_SECRET
    );

    if (!user) return res.status(400).json("Invalid token.");
    if (typeof user === "string")
      return res.status(400).json("Invalid data type.");

    const email = user.email;
    const hashedPassword = CryptoJS.AES.encrypt(
      password,
      PASSWORD_SECRET
    ).toString();
    await User.findOneAndUpdate(
      { email: email },
      {
        password: hashedPassword,
      }
    );
    res.status(200).json("Password has been changed successfully!");
  } catch (err) {
    return res.status(500).json(serverError);
  }
});

// LOGIN FAILED
router.get("/failed", (req: Request, res: Response) => {
  res.status(401).json("Failed login attempt.");
});

// LOGIN SUCCESS
router.get("/success", (req: Request, res: Response) => {
  if (req.user) {
    const userId = req.user as IUserSchema["_id"];
    generateAndSendAuthTokens(res, userId);
    res.status(200).json("Login success!");
  }
});

// GOOGLE OAUTH2
router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/failed",
  }),

  async (req, res) => {
    const userId = req.user as IUserSchema["_id"];
    generateAndSendAuthTokens(res, userId);
    res.redirect(CLIENT_URL + "/redirect");
  }
);

export default router;
