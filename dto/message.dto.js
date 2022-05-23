class MessageDto {
  messageId;
  text;
  senderId;
  contactId;
  createdAt;

  constructor(model) {
    this.messageId = model._id;
    this.text = model.text;
    this.senderId = model.senderId;
    this.contactId = model.contactId;
    this.createdAt = model.createdAt;
  }
}

export default MessageDto;
