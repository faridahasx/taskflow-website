"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("./middleware/passport"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("database"));
const keepAwake_1 = __importDefault(require("keepAwake"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = __importDefault(require("routes/auth"));
const task_1 = __importDefault(require("routes/task"));
const category_1 = __importDefault(require("routes/category"));
const stats_1 = __importDefault(require("routes/stats"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
//
// ENV
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI || "";
const COOKIE_SECRET = process.env.COOKIE_SECRET || "";
const NODE_ENV = process.env.NODE_ENV;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3001";
// Initialize the App
const app = (0, express_1.default)();
// Connect to MongoDB
(0, database_1.default)(DB_URI);
if (NODE_ENV === "DEVELOPMENT") {
    app.use((0, morgan_1.default)("dev"));
}
else {
    keepAwake_1.default.start();
}
// Middleware
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000 },
    store: connect_mongo_1.default.create({
        mongoUrl: DB_URI,
    }),
}));
app.use((0, cookie_parser_1.default)());
// Passport middleware
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// CORS options
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", CLIENT_URL);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use((0, cors_1.default)({
    origin: [CLIENT_URL],
    methods: "GET, POST, PUT, DELETE, PATCH",
    credentials: true,
}));
// Routes
app.get("/", (req, res) => {
    res.send("API is running ...");
});
app.use("/auth", auth_1.default);
app.use("/task", task_1.default);
app.use("/stats", stats_1.default);
app.use("/category", category_1.default);
// Listen
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
});
