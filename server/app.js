// core modules
const express = require("express");
const morgan = require("morgan");

// developer modules
const timelineRoute = require("./routes/timelineRoute");
const userRoute = require("./routes/userRoute");

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());

app.use("/api/v1/timeline", timelineRoute);
app.use("/api/v1/users", userRoute);

module.exports = app;
