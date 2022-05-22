function containsInString(original, query) {
  return original.toLowerCase().includes(query.toLowerCase());
}

function searchInUser(user, query) {
  return (
    containsInString(user.username, query) ||
    containsInString(user.firstName, query) ||
    containsInString(user.lastName, query) ||
    containsInString(user.description, query)
  );
}

export default searchInUser;
