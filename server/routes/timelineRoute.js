// core modules
const express = require("express");

// developer modules
const {
  getTimeline,
  addToTimeline,
  deleteTimeline,
  aboutTimeline,
} = require("../controllers/timelineController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.route("/").get(protect, getTimeline).post(protect, addToTimeline);

router
  .route("/:id")
  .get(protect, aboutTimeline)
  .delete(protect, deleteTimeline);

module.exports = router;
