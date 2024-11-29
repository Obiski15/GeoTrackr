const multer = require("multer");

function multerUpload() {
  const storage = multer.memoryStorage();
  return multer({ storage });
}

module.exports = multerUpload;
