const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema(
  {
    position: {
      type: [Number],
      required: [true, "position field is required"],
    },
    address: {
      type: String,
      required: [true, "address field is required"],
      lowercase: true,
      trim: true,
    },
    countryName: {
      type: String,
      required: [true, "countryName is required"],
      lowercase: true,
      trim: true,
    },
    countryCode: {
      type: String,
      required: [true, "countryCode is required"],
    },
    locality: {
      type: String,
      required: [true, "Locality is required"],
      lowercase: true,
      trim: true,
    },
    city: {
      type: String,
      required: [true, "city field is required"],
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "A category is required"],
      trim: true,
      lowercase: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Timeline = mongoose.model("Timeline", timelineSchema);

module.exports = Timeline;
