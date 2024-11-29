const AppError = require("../utils/AppError");

const DEFAULT_STATUS_CODE = 500;

function handleDBCastError(err) {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
}

function handleJsonWebTokenError() {
  return new AppError("Invalid Authentication Token", 401);
}

function handleTokenExpiredError() {
  return new AppError("Login session expired. Login Again", 401);
}

function handleDuplicateFieldError(req) {
  if (req.originalUrl.endsWith("/signup") || req.originalUrl.endsWith("/login"))
    return new AppError("Email or username already exits", 400);
}

function handleValidationError(err) {
  const validationErrors = Object.values(err.errors).map((e) => e.message);
  validationErrors.join(",");

  return new AppError(validationErrors.join(","), 400);
}

function handleErrorDev(err, res) {
  res.status(err.statusCode || DEFAULT_STATUS_CODE).json({
    error: err,
    status: err.status,
    message: err.message,
    stack: err.stack,
    code: err.statusCode,
  });
}

function handleErrorPROD(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      code: err.statusCode,
    });
  } else {
    res.status(DEFAULT_STATUS_CODE).json({
      status: "error",
      message: "Something went wrong please try again!",
      code: err.statusCode,
    });
  }
}

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    handleErrorDev(err, res);
  }

  if (process.env.NODE_ENV === "production") {
    let error = { ...err, name: err.name, message: err.message };

    if (error.name === "CastError") error = handleDBCastError(error);

    if (error.name === "JsonWebTokenError") error = handleJsonWebTokenError();

    if (error.name === "TokenExpiredError") error = handleTokenExpiredError();

    if (error.name === "ValidatorError") error = handleValidationError();

    if (error.code === 11000) error = handleDuplicateFieldError(req);

    handleErrorPROD(error, res);
  }
  console.log(err);

  next();
};
