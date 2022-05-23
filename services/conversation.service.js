import MessageDto from "../dto/message.dto.js";
import MessageModel from "../models/message.model.js";

class ConversationService {
  async createMessage(text, currentUserId, contactId) {
    const newMessage = await MessageModel.createMessage(
      text,
      currentUserId,
      contactId
    );

    const newMessageDto = new MessageDto(newMessage);

    global.io.sockets.in(contactId).emit("new", newMessageDto);

    return newMessageDto;
  }

  async readConversation(contactId) {
    const conversation = await MessageModel.find({ contactId }).sort({
      createdAt: 1,
    });

    const conversationDto = conversation.map(
      (message) => new MessageDto(message)
    );

    return conversationDto;
  }
}

export default new ConversationService();
