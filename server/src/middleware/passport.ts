import passport from "passport";
import CryptoJS from "crypto-js";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from "../models/user";
import { createRefreshToken } from "../utils/createToken";

const PASSWORD = process.env.SOCIAL_PASSWORD || "";
const PASSWORD_SECRET = process.env.PASSWORD_SECRET || "";
const BASE_URL = process.env.BASE_URL || "";

const OPTIONS = {
  clientID: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  callbackURL: `${BASE_URL}/auth/google/callback`,
};

const verify = async function (
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: any
) {
  const email = profile.emails[0]["value"];
  const firstname = profile.displayName;
  const lastname = profile.name.familyName;
  const user = await User.findOne({ email: email });

  if (!user) {
    const newUser = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: CryptoJS.AES.encrypt(PASSWORD, PASSWORD_SECRET).toString(),
    });
    await newUser.save();

    let token = createRefreshToken({
      userId: newUser._id,
    });
    return done(null, token);
  }
  let token = createRefreshToken({
    userId: user._id,
  });
  return done(null, token);
};

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));

passport.use(new GoogleStrategy(OPTIONS, verify));

export default passport;
