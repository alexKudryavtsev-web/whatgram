function makeAppeal(firstName, lastName, username) {
  if (!firstName && !lastName) {
    return username;
  }
  if (!firstName && lastName) {
    return lastName;
  }
  if (firstName && !lastName) {
    return firstName;
  }
  return firstName + " " + lastName;
}

export default makeAppeal;
