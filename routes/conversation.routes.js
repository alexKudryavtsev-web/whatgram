import { Router } from "express";
import ConversationController from "../controllers/conversation.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import validationMiddleware from "../middleware/validator.middleware.js";

import { createMessageValidator } from "../validators/conversation.validator.js";

const conversationRouter = new Router();

conversationRouter
  .post(
    "/:contactId",
    ...createMessageValidator,
    validationMiddleware,
    authMiddleware,
    ConversationController.createMessage
  )
  .get("/:contactId", authMiddleware, ConversationController.readConversation);

export default conversationRouter;
