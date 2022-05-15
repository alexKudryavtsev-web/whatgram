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
    firstName: String,
    lastName: String,
    description: String,
    contacts: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
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
  firstName,
  lastName,
  description,
  activationUserLink
) {
  const candidate = await this.findOne({ email });

  if (candidate) {
    throw ApiError.BadRequest(`User with ${email} email already exists`);
  }

  const user = await this.create({
    email,
    password,
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

export default model("User", UserSchema);
