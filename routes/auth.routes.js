import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import validationMiddleware from "../middleware/validator.middleware.js";
import { loginValidator } from "../validators/auth.validator.js";

const authRouter = new Router();

authRouter
  .post("/login", loginValidator, validationMiddleware, AuthController.login)
  .post("/logout", authMiddleware, AuthController.logout)
  .get("/refresh", authMiddleware, AuthController.refresh)
  .get("/test", authMiddleware, (req, res) => res.json(req.user));

export default authRouter;
