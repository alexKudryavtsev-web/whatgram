import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const userRouter = new Router();

userRouter
  .get("/:userId", UserController.readUserDetails)
  .get("/", UserController.readUsers)
  .post("/", UserController.createUser)
  .put("/", authMiddleware, UserController.updateUser)
  .delete("/", authMiddleware, UserController.deleteUser)
  .get("/activate-user/:activationUserLink", UserController.activateUser);

export default userRouter;
