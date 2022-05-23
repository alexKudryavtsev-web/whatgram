import ConversationService from "../services/conversation.service.js";

class ConversationController {
  async createMessage(req, res, next) {
    try {
      const { contactId } = req.params;
      const { text } = req.body;
      const { userId } = req.user;
      const newMessageData = await ConversationService.createMessage(
        text,
        userId,
        contactId
      );

      return res.json(newMessageData);
    } catch (error) {
      next(error);
    }
  }

  async readConversation(req, res, next) {
    try {
      const { contactId } = req.params;

      const conversationData = await ConversationService.readConversation(
        contactId
      );

      return res.json(conversationData);
    } catch (error) {
      next(error);
    }
  }
}

export default new ConversationController();
