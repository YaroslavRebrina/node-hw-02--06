const express = require("express");
const {
  get,
  getByID,
  updateContact,
  deleteContact,
  createNewContact,
  updateStatusContact,
} = require("../../controllers/contacts");
const { isAuthorized } = require("../../middlewares");
const { controllerWrapper } = require("../../heplers");
const { contactSchema, validateScheme } = require("../../middlewares");
const isIdValid = require("../../heplers/idValidator.js");

const router = express.Router();

router.get("/", isAuthorized, controllerWrapper(get));

router.get("/:contactId", isIdValid, controllerWrapper(getByID));

router.post(
  "/",
  isAuthorized,
  validateScheme(contactSchema),
  controllerWrapper(createNewContact)
);

router.delete(
  "/:contactId",
  isAuthorized,
  isIdValid,
  controllerWrapper(deleteContact)
);

router.patch(
  "/:contactId/favorite",
  isAuthorized,
  isIdValid,
  controllerWrapper(updateStatusContact)
);

router.put(
  "/:contactId",
  isAuthorized,
  isIdValid,
  validateScheme(contactSchema),
  controllerWrapper(updateContact)
);

module.exports = router;
