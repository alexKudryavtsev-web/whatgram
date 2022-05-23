import mongoose from "mongoose";

const { Schema, model } = mongoose;

const MessageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    contactId: {
      type: Schema.Types.ObjectId,
      ref: "Contact",
    },
  },
  {
    timestamps: true,
    collection: "messages",
  }
);

MessageSchema.statics.createMessage = async function (
  text,
  senderId,
  contactId
) {
  const message = await this.create({ text, senderId, contactId });

  return message;
};

MessageSchema.statics.getConversationByContactId = async function (
  contactId
) {};
export default model("Message", MessageSchema);
