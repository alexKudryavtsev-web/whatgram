import config from "config";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_OPTIONS = {
  expiresIn: "1h",
};

const REFRESH_TOKEN_OPTIONS = {
  expiresIn: "30d",
};

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(
      payload,
      config.get("ACCESS_SECRET"),
      ACCESS_TOKEN_OPTIONS
    );
    const refreshToken = jwt.sign(
      payload,
      config.get("REFRESH_SECRET"),
      REFRESH_TOKEN_OPTIONS
    );

    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token) {
    try {
      return jwt.verify(token, config.get("ACCESS_SECRET"));
    } catch (error) {
      return null;
    }
  }

  async verifyRefreshToken(token) {
    try {
      return jwt.verify(token, config.get("REFRESH_SECRET"));
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
