import { Router } from "express";
import ContactController from "../controllers/contact.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import validatorMiddleware from "../middleware/validator.middleware.js";
import { createContactValidator } from "../validators/contact.validator.js";

const contactRouter = new Router();

contactRouter
  .get("/", authMiddleware, ContactController.readContacts)
  .post(
    "/",
    ...createContactValidator,
    validatorMiddleware,
    authMiddleware,
    ContactController.createContact
  )
  .delete("/:contactId", authMiddleware, ContactController.deleteContact);

export default contactRouter;
