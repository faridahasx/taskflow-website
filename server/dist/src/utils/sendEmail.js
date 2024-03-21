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
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
const { OAuth2 } = googleapis_1.google.auth;
dotenv_1.default.config();
const MAILING_SERVICE_CLIENT_ID = process.env.MAILING_SERVICE_CLIENT_ID || "";
const MAILING_SERVICE_CLIENT_SECRET =
  process.env.MAILING_SERVICE_CLIENT_SECRET || "";
const MAILING_SERVICE_REFRESH_TOKEN =
  process.env.MAILING_SERVICE_REFRESH_TOKEN || "";
const SENDER_EMAIL_ADDRESS = process.env.SENDER_EMAIL_ADDRESS || "";
const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
);
// send mail
const sendEmail = (to, url) =>
  __awaiter(void 0, void 0, void 0, function* () {
    oauth2Client.setCredentials({
      refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
    });
    oauth2Client.getAccessToken().then((data) => {
      if (data.token) {
        const accessToken = data.token;
        const smtpTransport = nodemailer_1.default.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken,
          },
        });
        const mailOptions = {
          from: SENDER_EMAIL_ADDRESS,
          to: to,
          subject: "Reset Password",
          html: `
        <div
        style="
        max-width: 700px;
        margin: auto;
        border: 10px solid #ddd;
        padding: 50px 20px;
        font-size: 110%;
        "
    >
        <h2
        style="text-align: center; text-transform: uppercase; color: rgb(8, 62, 17)"
        >
        Reset Password
        </h2>
    
        <p>You've requested reset password link</p>
        <a
        href="${url}"
        style="
            background: rgb(55, 169, 78);
            text-decoration: none;
            color: white;
            padding: 10px 20px;
            margin: 10px 0;
            display: inline-block;
        "
        >Reset Password</a
        >
        <p>
        If the button doesn't work for any reason, you can also click on the link
        below:
        </p>
        <div style="text-align: center; color:  rgb(8, 62, 17)">${url}</div>
    </div>`,
        };
        smtpTransport.sendMail(mailOptions, (err, infor) => {
          if (err) {
            throw err;
          }
          return infor;
        });
      }
    });
  });
exports.default = sendEmail;
