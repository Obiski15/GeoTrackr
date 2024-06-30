// core modules
const express = require("express");

// developer modules
const {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  createUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getUser).post(deleteUser).patch(updateUser);

module.exports = router;
