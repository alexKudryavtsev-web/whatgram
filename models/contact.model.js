import mongoose from "mongoose";
import ApiError from "../errors/api.error.js";

const { Schema, model } = mongoose;

const ContactSchema = new Schema(
  {
    userId1: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userId2: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    collection: "contacts",
  }
);

ContactSchema.statics.createContact = async function (userId1, userId2) {
  const candidate = await this.findOne({ userId1, userId2 });
  if (candidate) {
    throw ApiError.BadRequest("Contact already created");
  }

  const contact = await this.create({ userId1, userId2 });

  return contact;
};

ContactSchema.statics.deleteContact = async function (contactId) {
  const contact = await this.findByIdAndDelete(contactId);

  return contact;
};

ContactSchema.statics.findUserContactsByUserId = async function (userId) {
  const contacts = await this.find({
    $or: [{ userId1: userId }, { userId2: userId }],
  }).sort({ createdAt: 1 });

  return contacts;
};

export default model("Contact", ContactSchema);
