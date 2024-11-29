const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "An email is required"],
      validate: {
        validator: (val) => validator.isEmail(val),
        message: "Invalid Email Address",
      },
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Username required"],
      minlength: [5, "Minimum username length is 5"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "kindly provide a password"],
      minlength: [8, "Minimum password length is 8"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "kindly confirm your password"],
      minlength: [6, "Minimum password length is 6"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Provided password doesn't match",
      },
    },
    role: {
      type: String,
      default: "user",
    },
    image: String,
    passwordLastChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpiresIn: Date,
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  if (!this.isNew) {
    this.passwordLastChangedAt = new Date();
  }
  next();
});

userSchema.methods.comparePassword = async function (
  registeredPassword,
  userPassword,
) {
  return await bcrypt.compare(registeredPassword, userPassword);
};

userSchema.methods.confirmPasswordChange = function (tokenIssuedAt) {
  return new Date(this.passwordLastChangedAt).getTime() / 1000 > tokenIssuedAt;
};

userSchema.methods.createResetToken = function () {
  // generate a random hex string
  const token = crypto.randomBytes(32).toString("hex");

  // stored hashed token in DB
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // set Expiry time for token - 10 mins
  this.passwordResetTokenExpiresIn = Date.now() + 10 * 60 * 1000;

  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
