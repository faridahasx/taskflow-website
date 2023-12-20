import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
const { OAuth2 } = google.auth;
dotenv.config();

const MAILING_SERVICE_CLIENT_ID = process.env.MAILING_SERVICE_CLIENT_ID || "";
const MAILING_SERVICE_CLIENT_SECRET =
  process.env.MAILING_SERVICE_CLIENT_SECRET || "";
const MAILING_SERVICE_REFRESH_TOKEN =
  process.env.MAILING_SERVICE_REFRESH_TOKEN || "";
const SENDER_EMAIL_ADDRESS = process.env.SENDER_EMAIL_ADDRESS || "";

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN
);

// send mail
const sendEmail = async (to: string, url: string) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });

  oauth2Client.getAccessToken().then((data) => {
    if (data.token) {
      const accessToken: string = data.token;
      const smtpTransport = nodemailer.createTransport({
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
};

export default sendEmail;
