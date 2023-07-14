const multer = require("multer");
const path = require("path");

const tmpDir = path.resolve(__dirname, "../", "tmp");

const multerSettings = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    const { _id } = req.user;
    cb(null, String(_id) + file.originalname);
  },
});

const upload = multer({
  storage: multerSettings,
});

module.exports = upload;
