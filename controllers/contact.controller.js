import ContactService from "../services/contact.service.js";

class ContactController {
  async createContact(req, res, next) {
    try {
      const { userId: userId1 } = req.user;
      const { userId: userId2 } = req.body;

      const contactData = await ContactService.createContact(userId1, userId2);

      return res.json(contactData);
    } catch (error) {
      next(error);
    }
  }

  async deleteContact(req, res, next) {
    try {
      const { contactId } = req.params;

      await ContactService.deleteContact(contactId);

      return res.status(200).end();
    } catch (error) {
      next(error);
    }
  }

  async readContacts(req, res, next) {
    try {
      const { userId } = req.user;

      const contacts = await ContactService.readContacts(userId);

      return res.json(contacts);
    } catch (error) {
      next(error);
    }
  }
}

export default new ContactController();
