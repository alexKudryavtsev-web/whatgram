class ContactDto {
  users;
  contactId;

  constructor(model) {
    this.users = [model.userId1, model.userId2];
    this.contactId = model._id;
  }
}

export default ContactDto;
