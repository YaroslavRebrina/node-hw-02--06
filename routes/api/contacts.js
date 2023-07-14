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
const {
  contactSchema,
  validateScheme,
  idValidator,
} = require("../../middlewares");

const router = express.Router();

router.get("/", isAuthorized, controllerWrapper(get));

router.get("/:contactId", idValidator, controllerWrapper(getByID));

router.post(
  "/",
  isAuthorized,
  validateScheme(contactSchema),
  controllerWrapper(createNewContact)
);

router.delete(
  "/:contactId",
  isAuthorized,
  idValidator,
  controllerWrapper(deleteContact)
);

router.patch(
  "/:contactId/favorite",
  isAuthorized,
  idValidator,
  controllerWrapper(updateStatusContact)
);

router.put(
  "/:contactId",
  isAuthorized,
  idValidator,
  validateScheme(contactSchema),
  controllerWrapper(updateContact)
);

module.exports = router;
