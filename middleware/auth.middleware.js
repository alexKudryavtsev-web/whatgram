import ApiError from "../errors/api.error.js";
import TokenService from "../services/token.service.js";

async function authMiddleware(req, res, next) {
  try {
    if (!req.headers["authorization"]) {
      throw ApiError.UnauthorizedError();
    }

    const accessToken = req.headers["authorization"].split(" ")[1];
    const dataFromToken = await TokenService.verifyAccessToken(accessToken);

    if (!accessToken || !dataFromToken) {
      throw ApiError.UnauthorizedError();
    }

    req.user = {
      userId: dataFromToken.userId,
      email: dataFromToken.email,
    };

    next();
  } catch (error) {
    next(error);
  }
}

export default authMiddleware;
