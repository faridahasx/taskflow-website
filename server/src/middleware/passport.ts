import passport from "passport";
import CryptoJS from "crypto-js";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from "../models/user";

const PASSWORD = process.env.SOCIAL_PASSWORD || "";
const PASSWORD_SECRET = process.env.PASSWORD_SECRET || "";
const BASE_URL = process.env.BASE_URL || "";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "TO TEST"
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ""
const callbackURL = `${BASE_URL}/auth/google/callback`

console.log(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, callbackURL)


const OPTIONS = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: callbackURL,
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
    return done(null, newUser._id);
  }
  return done(null, user._id);
};

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));

passport.use(new GoogleStrategy(OPTIONS, verify));

export default passport;
