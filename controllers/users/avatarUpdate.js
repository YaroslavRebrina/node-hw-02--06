const path = require("path");
const fs = require("fs/promises");
const { imgSizer } = require("../../heplers");
const User = require("../../schemas/user");

const avatarUpdate = async (req, res, next) => {
  const { _id } = req.user;

  const { path: tempUpload, filename } = req.file;

  const avatarDir = path.resolve(__dirname, "../", "../", "public", "avatars");
  const resultUploadDir = path.resolve(avatarDir, filename);

  try {
    await fs.rename(tempUpload, resultUploadDir);

    imgSizer(resultUploadDir);

    const { avatarURL } = await User.findByIdAndUpdate(
      _id,
      { avatarURL: `avatars/${filename}` },
      { new: true }
    );

    res.json(avatarURL);
  } catch (err) {
    next(err);
  }
};

module.exports = avatarUpdate;
