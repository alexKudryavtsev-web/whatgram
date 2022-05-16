class UserDto {
  email;
  userId;
  username;
  firstName;
  lastName;
  description;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.userId = model._id;
    this.username = model.username;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.description = model.description;
    this.isActivated = model.isActivated;
  }
}

export default UserDto;
