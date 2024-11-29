const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

const uploadImage = require("../utils/uploadImage");
const AppError = require("../utils/AppError");

exports.getUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { username } = req.body;
  const imageFile = req.file;

  if (!username) return next(new AppError("Username not provided", 400));

  const image = imageFile ? await uploadImage(imageFile, next) : req.user.image;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { username, image },
    { runValidators: true },
  );

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
