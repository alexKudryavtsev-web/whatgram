import bcrypt from "bcrypt";
import config from "config";
import { v4 } from "uuid";

import UserDto from "../dto/user.dto.js";
import RefreshTokenModel from "../models/refreshToken.model.js";
import UserModel from "../models/user.model.js";

import MailService from "./mail.service.js";

const SALT_ROUNDS = 10;

class UserService {
  async createUser(
    email,
    password,
    username,
    firstName,
    lastName,
    description
  ) {
    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const activationUserLink = v4();

    const appeal = firstName || lastName || username;
    MailService.sendActivationMail(
      email,
      appeal,
      `${config.get("API_URL")}/api/user/activate-user/${activationUserLink}`
    );

    const user = await UserModel.createUser(
      email,
      hashPassword,
      username,
      firstName,
      lastName,
      description,
      activationUserLink
    );

    const userDto = new UserDto(user);

    return userDto;
  }

  async updateUser(userId, firstName, lastName, description) {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        description,
      },
      { new: true }
    );

    const userDto = new UserDto(user);

    return userDto;
  }

  async deleteUser(userId) {
    await UserModel.findByIdAndDelete(userId);
    await RefreshTokenModel.deleteRefreshToken(userId);
  }

  async readUserDetails(userId) {
    const user = await UserModel.findUserById(userId);
    const userDto = new UserDto(user);

    return userDto;
  }

  async readUsers() {
    const users = await UserModel.find();
    const usersDto = users.map((user) => new UserDto(user));

    return usersDto;
  }

  async activateUser(activationUserLink) {
    const user = await UserModel.findUserByActivationLink(activationUserLink);

    user.isActivated = true;
    await user.save();
  }
}

export default new UserService();
