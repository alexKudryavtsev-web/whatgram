import mongoose from "mongoose";
import ApiError from "../errors/api.error.js";

const { Schema, model } = mongoose;

const RefreshTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

RefreshTokenSchema.statics.saveRefreshToken = async function (
  userId,
  refreshToken
) {
  const candidate = await this.findOne({ userId });

  if (candidate) {
    candidate.refreshToken = refreshToken;
    await candidate.save();

    return candidate;
  }

  const token = await this.create({ userId, refreshToken });

  return token;
};

RefreshTokenSchema.statics.deleteRefreshToken = async function (userId) {
  const token = await this.findOneAndDelete({ userId });

  return token;
};

RefreshTokenSchema.statics.findByRefreshToken = async function (refreshToken) {
  const token = await this.findOne({ refreshToken });

  if (!token) {
    throw ApiError.BadRequest("Refresh token not found");
  }

  return token;
};

export default model("RefreshToken", RefreshTokenSchema);
