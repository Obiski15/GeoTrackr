// core modules
const mongoSanitize = require("express-mongo-sanitize");
const rateLimiter = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const xss = require("xss-clean");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const hpp = require("hpp");

// developer modules
const globalErrorHandler = require("./controllers/errorController");
const timelineRoute = require("./routes/timelineRoute");
const userRoute = require("./routes/userRoute");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

// security http headers
app.use(helmet());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

const limiter = rateLimiter({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many request please try again in an hour",
});

// limit request from same api
app.use("/api", limiter);

// body parser - reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://geo-trackr.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Orgin not allowed. Blocked by cors..."));
      }
    },
    credentials: true,
  }),
);

// cookie parser - reading data from the cookies into req.cookies
app.use(cookieParser());

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

// data sanitization against XSS attack
app.use(xss());

// prevents parameter pollution
app.use(hpp());

// route handlers
app.use("/api/v1/timeline", timelineRoute);
app.use("/api/v1/user", userRoute);

app.use(globalErrorHandler);

module.exports = app;
