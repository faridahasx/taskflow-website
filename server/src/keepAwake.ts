import { CronJob } from "cron";
import https from "https";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const job = new CronJob("*/14 * * * * *", () => {
  https
    .get(BASE_URL, (res) => {
      if (res.statusCode !== 200) {
        console.log(
          `Failed to restart the server with status code: ${res.statusCode}`
        );
      }
    })
    .on("error", (err) => {
      console.error("Error during restart:", err);
    });
});

export default job;
