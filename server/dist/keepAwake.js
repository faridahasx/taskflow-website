"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const cron_1 = require("cron");
const https_1 = __importDefault(require("https"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const job = new cron_1.CronJob("*/14 * * * * *", () => {
  https_1.default
    .get(BASE_URL, (res) => {
      if (res.statusCode !== 200) {
        console.log(
          `Failed to restart the server with status code: ${res.statusCode}`,
        );
      }
    })
    .on("error", (err) => {
      console.error("Error during restart:", err);
    });
});
exports.default = job;
