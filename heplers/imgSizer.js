const Jimp = require("jimp");
const errorHandler = require("./errorHandler");

const imgSizer = (newAvatarDir) => {
  return Jimp.read(newAvatarDir)
    .then((ava) => {
      return ava.resize(250, 250).write(newAvatarDir);
    })
    .catch((err) => {
      throw errorHandler(err);
    });
};

module.exports = imgSizer;
