const errorHandler = require("./errorHandler");

const controllerWrapper = (controller) => {
  const func = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      if (err.code === 11000) {
        next(errorHandler(409));
      }
      next(err);
    }
  };

  return func;
};

module.exports = controllerWrapper;
