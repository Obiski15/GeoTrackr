const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/userModel");

const uploadImage = require("../utils/uploadImage");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const sendMail = require("../utils/sendMail");

function signToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

function createSendToken(user, statusCode, res) {
  const token = signToken({ id: user._id });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    expires: new Date(
      Date.now() + +process.env.COOKIE_JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
}

exports.signup = catchAsync(async (req, res, next) => {
  // check if image is present else return an empty string
  const image = req.file ? await uploadImage(req.file, next) : "";

  // create new user
  const user = await User.create({ ...req.body, image });

  // assign jwt and send back response
  createSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // checks if email and password fields were provided
  if (!email || !password)
    return next(new AppError("Email and password fields are required", 400));

  // check if email filed is a username instead
  const query = email.includes("@") ? { email } : { username: email };

  // find user
  const user = await User.findOne(query).select("+password");

  // check if user exist and verify password if it does
  if (!user || !(await user.comparePassword(password, user.password)))
    return next(new AppError("invalid Login credentials", 400));

  // assign jwt and send back response
  createSendToken(user, 200, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // destructure email field
  const { email } = req.body;

  // if there isn't an email throw an error
  if (!email)
    return next(new AppError("Please provide email or username", 400));

  // check if value is an email or username
  const query = email.includes("@") ? { email } : { username: email };

  // find user
  const user = await User.findOne(query);

  // if there is no user throw an error
  if (!user)
    return next(new AppError("Invalid Email Address or Username", 404));

  // if user exist administer reset tokem
  const token = await user.createResetToken();

  // Save token to DB
  user.save({ validateBeforeSave: false });

  // construct email URL
  const URL = `${req.headers.referer}auth/reset-password/${token}`;

  // send email to user for verification
  try {
    await sendMail({
      email: user.email,
      subject: "Geotrackr password reset",
      html: `
        <p>Forgot your password? We've got your back. Kindly click on the link below to verify your identity:</p>
        <p><a href="${URL}">${URL}</a></p>
        <p>Please ignore this message if you think there was a mistake sending it to you.</p>
      `,
    });

    res.status(200).json({
      status: "success",
      message: "Reset token sent! Check your Email for reset link",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiresIn = undefined;
    user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "An error occured while trying to process your request",
        500,
      ),
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  // check for the password and confirmPassword field
  if (!password || !confirmPassword)
    return next(new AppError("Kindly fill the required fields", 400));

  // generate hash based on the provided token
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // find user based on token and expiry time
  const user = await User.findOne({
    passwordResetToken,
    passwordResetTokenExpiresIn: { $gte: Date.now() },
  });

  // if no user is found throw an error
  if (!user) return next(new AppError("Token is invalid or has expired", 400));

  //  if user is found save password to re-run validation and reset token with expiry date
  user.password = password;
  user.confirmPassword = confirmPassword;
  user.passwordResetTokenExpiresIn = undefined;
  user.passwordResetToken = undefined;
  await user.save();

  // Issue new jwt token
  createSendToken(user, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie("jwt");

  res.status(200).json({ status: "success" });
});

exports.protect = catchAsync(async (req, res, next) => {
  // check if auth token is available
  let token;

  if (req.headers.authorization) {
    if (!req.headers.authorization.startsWith("Bearer"))
      return next(new AppError("Invalid or missing auth token", 401));
    token = req.headers.authorization.split(" ")[1];
  } else {
    token = req.cookies.jwt;
  }

  if (!token) return next(new AppError("Auth token is missing", 401));

  // validate provided token
  const { id, iat: tokenIssuedAt } = jwt.verify(token, process.env.JWT_SECRET);

  // check if user is present in DB
  const user = await User.findOne({ _id: id });

  // if user isn't found throw an error
  if (!user)
    return next(
      new AppError("User doesn't exist. kindly provide a valid token", 401),
    );

  // check if user has changed password since last login
  const passwordChanged = await user.confirmPasswordChange(tokenIssuedAt);

  // check if password has been changed
  if (passwordChanged)
    return next(
      new AppError(
        "Password has been changed since last login. Please log in again",
        401,
      ),
    );

  req.user = user;
  next();
});

exports.restrictTo = (...roles) =>
  catchAsync(async (req, _res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );

    next();
  });
