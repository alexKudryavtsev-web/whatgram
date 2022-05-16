import { validationResult } from "express-validator";
import ApiError from "../errors/api.error.js";

function validationMiddleware(req, res, next) {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      throw ApiError.BadRequest("Validation error", result.array());
    }

    next();
  } catch (error) {
    next(error);
  }
}

export default validationMiddleware;
