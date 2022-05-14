class UserDetails {
  email;
  firstName;
  lastName;
  userId;
  description;

  constructor(model) {
    this.email = model.email;
    this.userId = model._id;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.description = model.description;
  }
}

export default UserDetails;
