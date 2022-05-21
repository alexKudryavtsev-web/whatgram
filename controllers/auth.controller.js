import AuthService from "../services/auth.service.js";

const cookieOptions = {
  httpOnly: true,
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const loginData = await AuthService.login(email, password);

      res.cookie("refreshToken", loginData.tokens.refreshToken, cookieOptions);

      return res.json(loginData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await AuthService.logout(refreshToken);

      res.clearCookie("refreshToken");

      return res.status(200).end();
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const refreshData = await AuthService.refresh(refreshToken);

      res.cookie(
        "refreshToken",
        refreshData.tokens.refreshToken,
        cookieOptions
      );

      return res.json(refreshData);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
