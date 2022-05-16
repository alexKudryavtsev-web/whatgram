import UserModel from "../models/user.model.js";
import ContactModel from "../models/contact.model.js";
import ContactDto from "../dto/contact.dto.js";

class ContactService {
  async createContact(userId1, userId2) {
    const user1 = await UserModel.findUserById(userId1);
    const user2 = await UserModel.findUserById(userId2);

    const contact = await ContactModel.createContact(user1._id, user2._id);

    const contactDto = new ContactDto(contact);

    return { contact: contactDto };
  }

  async deleteContact(contactId) {
    await ContactModel.deleteContact(contactId);
  }

  async readContacts(userId) {
    const contacts = await ContactModel.findUserContactsByUserId(userId);

    const contactsDto = contacts.map((contact) => new ContactDto(contact));

    return contactsDto;
  }
}

export default new ContactService();
