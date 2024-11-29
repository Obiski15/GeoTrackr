const Timeline = require("../models/timelineModel");

const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getTimeline = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Timeline.find({ user: req.user._id }),
    req.query,
  ).sort();

  const timeline = await features.query;

  res.status(200).json({
    status: "success",

    data: {
      results: timeline.length,
      timeline,
    },
  });
});

exports.aboutTimeline = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const timeline = await Timeline.find({ _id: id, user: req.user._id });

  if (!timeline)
    return next(new AppError(`Couldn't find that timeline: ${id}`, 404));

  res.status(200).json({
    status: "success",
    data: timeline,
  });
});

exports.addToTimeline = catchAsync(async (req, res, next) => {
  const timeline = await Timeline.create({ ...req.body, user: req.user._id });

  res.status(201).json({
    status: "success",
    data: {
      timeline: timeline,
    },
  });
});

exports.deleteTimeline = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const timeline = await Timeline.findByIdAndDelete(id);

  if (!timeline)
    return next(new AppError(`Couldn't find timeline: ${id}`, 404));

  res.status(200).json({
    status: "success",
  });
});
