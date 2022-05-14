class UserDto {
  email;
  userId;
  firstName;
  lastName;
  description;
  contacts;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.userId = model._id;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.description = model.description;
    this.contacts = model.contacts;
    this.isActivated = model.isActivated;
  }
}

export default UserDto;
