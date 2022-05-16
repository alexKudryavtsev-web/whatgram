import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import validatorMiddleware from "../middleware/validator.middleware.js";

import { createUserValidator } from "../validators/user.validator.js";

const userRouter = new Router();

userRouter
  .get("/:userId", UserController.readUserDetails)
  .get("/", UserController.readUsers)
  .post(
    "/",
    ...createUserValidator,
    validatorMiddleware,
    UserController.createUser
  )
  .put("/", authMiddleware, UserController.updateUser)
  .delete("/", authMiddleware, UserController.deleteUser)
  .get("/activate-user/:activationUserLink", UserController.activateUser);

export default userRouter;
