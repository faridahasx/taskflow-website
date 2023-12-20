import express from "express";
import cookieParser from "cookie-parser";
import passport from "./middleware/passport";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database";
import keepAwake from "./keepAwake";
import morgan from "morgan";
import auth from "./routes/auth";
import task from "./routes/task";
import category from "./routes/category";
import stats from "./routes/stats";
import session from "express-session";
import MongoStore from "connect-mongo";
//

// ENV
dotenv.config();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI || "";
const COOKIE_SECRET = process.env.COOKIE_SECRET || "";
const NODE_ENV = process.env.NODE_ENV;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3001";

// Initialize the App
const app = express();

// Connect to MongoDB
connectDB(DB_URI);

if (NODE_ENV === "DEVELOPMENT") {
  app.use(morgan("dev"));
} else {
  keepAwake.start();
}

// Middleware
app.use(express.json());
app.use(
  session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000 },
    store: MongoStore.create({
      mongoUrl: DB_URI,
    }),
  })
);
app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// CORS options
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", CLIENT_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(
  cors({
    origin: [CLIENT_URL],
    methods: "GET, POST, PUT, DELETE, PATCH",
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("API is running ...");
});

app.use("/auth", auth);
app.use("/task", task);
app.use("/stats", stats);
app.use("/category", category);

// Listen
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
});
