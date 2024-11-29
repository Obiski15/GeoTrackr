const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT_EXCEPTION 💥");
  console.log("Shutting down application ....");
  console.log(err.message, err.name);
  process.exit(1);
});

dotenv.config({ path: "./.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace("%PASSWORD%", process.env.DB_PASSWORD);

mongoose
  .connect(DB, { dbName: "GeoTrackr" })
  .then(() => console.log("connection successfull"));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}....`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED_REJECTION 💣");
  console.log("Shutting down application ....");
  console.log(err.message, err.name);
  server.close(() => {
    process.exit(1);
  });
});
