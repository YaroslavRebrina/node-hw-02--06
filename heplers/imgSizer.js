const Jimp = require("jimp");
const errorHandler = require("./errorHandler");

const imgSizer = (newAvatarDir, originalname) => {
  return Jimp.read(newAvatarDir, (err, ava) => {
    if (err) {
      throw errorHandler();
    }

    ava.resize(250, 250).write(originalname);
  });
};

module.exports = imgSizer;
