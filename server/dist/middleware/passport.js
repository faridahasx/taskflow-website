"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const passport_google_oauth2_1 = require("passport-google-oauth2");
const user_1 = __importDefault(require("../models/user"));
const PASSWORD = process.env.SOCIAL_PASSWORD || "";
const PASSWORD_SECRET = process.env.PASSWORD_SECRET || "";
const BASE_URL = process.env.BASE_URL || "";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "TO TEST";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const callbackURL = `${BASE_URL}/auth/google/callback`;
const OPTIONS = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: callbackURL,
};
const verify = function (accessToken, refreshToken, profile, done) {
  return __awaiter(this, void 0, void 0, function* () {
    const email = profile.emails[0]["value"];
    const firstname = profile.displayName;
    const lastname = profile.name.familyName;
    const user = yield user_1.default.findOne({ email: email });
    if (!user) {
      const newUser = new user_1.default({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: crypto_js_1.default.AES.encrypt(
          PASSWORD,
          PASSWORD_SECRET,
        ).toString(),
      });
      yield newUser.save();
      return done(null, newUser._id);
    }
    return done(null, user._id);
  });
};
passport_1.default.serializeUser((user, done) => done(null, user));
passport_1.default.deserializeUser((user, done) => done(null, user));
passport_1.default.use(new passport_google_oauth2_1.Strategy(OPTIONS, verify));
exports.default = passport_1.default;
