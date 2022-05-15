import config from "config";
import UserService from "../services/user.service.js";

class UserController {
  async createUser(req, res, next) {
    try {
      const {
        email,
        password,
        firstName = "",
        lastName = "",
        description = "",
      } = req.body;

      const userData = await UserService.createUser(
        email,
        password,
        firstName,
        lastName,
        description
      );

      return res.json({ user: userData });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { userId } = req.user;
      const { firstName, lastName, description, contacts } = req.body;

      const userData = await UserService.updateUser(
        userId,
        firstName,
        lastName,
        description,
        contacts
      );

      return res.json({ user: userData });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { userId } = req.user;

      await UserService.deleteUser(userId);

      res.clearCookie("refreshToken");

      return res.status(201).end();
    } catch (error) {
      next(error);
    }
  }

  async readUserDetails(req, res, next) {
    try {
      const { userId } = req.params;

      const userDetailsData = await UserService.readUserDetails(userId);

      return res.json({ user: userDetailsData });
    } catch (error) {
      next(error);
    }
  }

  async readUsers(req, res, next) {
    try {
      const usersData = await UserService.readUsers();

      return res.json(usersData);
    } catch (error) {
      next(error);
    }
  }

  async activateUser(req, res, next) {
    try {
      const { activationUserLink } = req.params;

      await UserService.activateUser(activationUserLink);

      return res.redirect(config.get("CLIENT_URL"));
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
