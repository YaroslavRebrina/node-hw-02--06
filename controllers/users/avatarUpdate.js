const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { errorHandler } = require("../../heplers");

const avatarUpdate = async (req, res, next) => {
  const avatarDir = path.resolve(__dirname, "../", "../", "public", "avatars");

  try {
    const { path: tempUpload, filename } = req.file;

    const resultUpload = path.resolve(avatarDir, filename);

    const newAvatarDir = await fs.rename(tempUpload, resultUpload);
    console.log("originalname:", filename);

    await Jimp.read(resultUpload)
      .then((ava) => {
        return ava.resize(250, 250).write(resultUpload);
      })
      .catch((err) => {
        throw errorHandler(err);
      });

    res.json(newAvatarDir);
  } catch (err) {
    next(err);
  }
};

module.exports = avatarUpdate;
