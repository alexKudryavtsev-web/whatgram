import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const userRouter = new Router();

userRouter
  .get("/:userId", UserController.readUserDetails)
  .get("/", UserController.readUsers)
  .post("/", UserController.createUser)
  .put("/", UserController.updateUser)
  .delete("/", UserController.deleteUser)
  .get("/activate-user/:activationUserLink", UserController.activateUser);

export default userRouter;
