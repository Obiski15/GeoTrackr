const cloudinary = require("cloudinary");
const sharp = require("sharp");

const AppError = require("./AppError");

cloudinary.config({
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
});

module.exports = async function (file, next) {
  const acceptedTpyes = ["image/jpg", "image/jpeg", "image/png"];

  if (!acceptedTpyes.includes(file.mimetype))
    return next(
      new AppError("Invalid image format. Please provide a valid image", 400),
    );

  const optimisedImage = await sharp(file.buffer)
    .jpeg({ quality: 80 })
    .resize(800)
    .toBuffer();

  const imageUploadResult = await new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream(
        {
          folder: "/GeoTrackr/user",
          use_filename: true,
        },
        (error, uploadResult) => {
          if (error)
            reject(
              next(
                new AppError("Unable to upload image. Please Try Again", 500),
              ),
            );

          resolve(uploadResult);
        },
      )
      .end(optimisedImage);
  });

  return imageUploadResult.secure_url;
};
