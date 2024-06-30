const fs = require("fs");

const filePath = `${__dirname}/../data/timeline.json`;
const timeline = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// middleware created to change the body of a post request to test verifyBody middleware
exports.changeBody = (req, res, next) => {
  req.body.position = "";

  next();
};

// middleware meant for the post request and checks if an address and position is available
exports.verifyBody = (req, res, next) => {
  if (!req.body.address || !req.body.position)
    return res.status(400).json({
      status: "fail",
      message: "user's address and position is required",
    });

  next();
};

// middleware meant for field with an id parameter, checks if the requested object is available
exports.checkId = (_, res, next, val) => {
  const requestedTimeline = timeline.find((data) => data.id === +val);

  if (!requestedTimeline)
    return res.status(404).json({
      status: "fail",
      data: "cannot find that timeline",
    });

  next();
};

exports.getTimeline = (req, res) => {
  res.status(200).json({
    status: "success",
    results: timeline.length,
    timeline: timeline,
  });
};

exports.aboutTimeline = (req, res) => {
  const { id } = req.params;

  const requestedTimeline = timeline.find((data) => data.id === +id);

  res.status(200).json({
    status: "success",
    data: requestedTimeline,
  });
};

exports.addToTimeline = (req, res) => {
  const newId = +timeline[timeline.length - 1].id + 1;

  const newTimeline = Object.assign({ id: newId }, req.body);

  fs.writeFile(filePath, JSON.stringify([...timeline, newTimeline]), (err) => {
    if (err) return console.log(err);

    res.status(201).json({
      status: "success",
      data: newTimeline,
    });
  });
};

exports.deleteTimeline = (req, res) => {
  const { id } = req.params;

  const newTimeline = timeline.filter((data) => data.id !== +id);

  fs.writeFile(
    `${__dirname}/data/timeline.json`,
    JSON.stringify(newTimeline),
    (err) => {
      if (err) console.log(err);

      res.status(204).json({
        status: "success",
        data: null,
      });
    },
  );
};
