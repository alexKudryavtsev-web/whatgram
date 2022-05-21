import bcrypt from "bcrypt";

import UserDto from "../dto/user.dto.js";
import ApiError from "../errors/api.error.js";
import TokenService from "./token.service.js";
import UserModel from "../models/user.model.js";
import RefreshTokenModel from "../models/refreshToken.model.js";

class AuthService {
  async login(email, password) {
    const user = await UserModel.findUserByEmail(email);

    if (!user.isActivated) {
      throw ApiError.BadRequest("User isn't activated");
    }

    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword) {
      throw ApiError.BadRequest("Wrong password");
    }

    const userDto = new UserDto(user);
    const tokens = await TokenService.generateTokens({ ...userDto });

    await RefreshTokenModel.saveRefreshToken(
      userDto.userId,
      tokens.refreshToken
    );

    return { tokens, user: userDto };
  }

  async logout(refreshToken) {
    await RefreshTokenModel.findByRefreshToken(refreshToken);
  }

  async refresh(refreshToken) {
    const dataFromToken = await TokenService.verifyRefreshToken(refreshToken);
    const dataFromDB = await RefreshTokenModel.findByRefreshToken(refreshToken);

    if (!dataFromDB || !dataFromToken) {
      throw ApiError.BadRequest("Invalid refresh token");
    }

    const user = await UserModel.findUserById(dataFromToken.userId);
    const userDto = new UserDto(user);

    const tokens = await TokenService.generateTokens({ ...userDto });

    await RefreshTokenModel.saveRefreshToken(
      userDto.userId,
      tokens.refreshToken
    );

    return { tokens, user: userDto };
  }
}

export default new AuthService();
