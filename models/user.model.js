import mongoose from "mongoose";
import ApiError from "../errors/api.error.js";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: String,
    lastName: String,
    description: String,
    password: String,
    activationUserLink: {
      type: String,
      unique: true,
      required: true,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

UserSchema.statics.createUser = async function (
  email,
  password,
  username,
  firstName,
  lastName,
  description,
  activationUserLink
) {
  const candidateByEmail = await this.findOne({ email });

  if (candidateByEmail) {
    throw ApiError.BadRequest(`User with ${email} email already exists`);
  }

  const candidateByUsername = await this.findOne({ username });

  if (candidateByUsername) {
    throw ApiError.BadRequest(`User with ${username} username already exists`);
  }

  const user = await this.create({
    email,
    password,
    username,
    firstName,
    lastName,
    description,
    activationUserLink,
  });

  return user;
};

UserSchema.statics.findUserById = async function (userId) {
  const user = await this.findById(userId);

  if (!user) {
    throw ApiError.BadRequest("User not found");
  }

  return user;
};

UserSchema.statics.findUserByActivationLink = async function (
  activationUserLink
) {
  const user = await this.findOne({ activationUserLink });

  if (!user) {
    throw ApiError.BadRequest("User not found");
  }

  return user;
};

UserSchema.statics.findUserByEmail = async function (email) {
  const user = await this.findOne({ email });

  if (!user) {
    throw ApiError.BadRequest(`User with ${email} email not found`);
  }

  return user;
};

UserSchema.statics.findUserByUsername = async function (username) {
  const user = await this.findOne({ username });

  if (!user) {
    throw ApiError.BadRequest(`User with ${username} username not found`);
  }

  return user;
};

export default model("User", UserSchema);
