const express = require("express");

const { getUser, updateUser } = require("../controllers/userController");
const {
  signup,
  login,
  resetPassword,
  forgotPassword,
  protect,
  logout,
} = require("../controllers/authController");
const multerUpload = require("../utils/multerUpload");

const router = express.Router();

router.post("/signup", multerUpload().single("image"), signup);
router.patch("/reset-password/:token", resetPassword);
router.post("/forgot-password", forgotPassword);
router.post("/logout", logout);
router.post("/login", login);

router
  .route("/")
  .get(protect, getUser)
  .put(protect, multerUpload().single("image"), updateUser);

module.exports = router;
