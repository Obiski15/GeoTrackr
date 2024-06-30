// core modules
const express = require("express");

// developer modules
const {
  getTimeline,
  addToTimeline,
  deleteTimeline,
  aboutTimeline,
  checkId,
  verifyBody,
} = require("../controllers/timelineController");

const router = express.Router();

router.param("id", checkId);

router.route("/").get(getTimeline).post(verifyBody, addToTimeline);
router.route("/:id").get(aboutTimeline).delete(deleteTimeline);

module.exports = router;
