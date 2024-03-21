"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./database"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = __importDefault(require("./routes/auth"));
const task_1 = __importDefault(require("./routes/task"));
const category_1 = __importDefault(require("./routes/category"));
// import quote from "./routes/quote";
const quote_1 = __importDefault(require("./routes/quote"));
// ENV
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI || "";
const NODE_ENV = process.env.NODE_ENV;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
// Initialize the App
const app = (0, express_1.default)();
// Connect to MongoDB
(0, database_1.default)(DB_URI);
(0, quote_1.default)();
// Logging
if (NODE_ENV === "development") {
  app.use((0, morgan_1.default)("dev"));
}
// Middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Passport middleware
app.use(passport_1.default.initialize());
// app.use(passport.session())
// CORS options
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});
app.use(
  (0, cors_1.default)({
    origin: ["*"],
    methods: "GET, POST, PUT, DELETE, PATCH",
    credentials: true,
  }),
);
// Routes
app.use("/auth", auth_1.default);
app.use("/task", task_1.default);
app.use("/category", category_1.default);
// app.use('/quote', quote)
// Listen
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
});
