import { useMemo } from "react";
import searchInUser from "../utils/searchInUser.js";

function useUsers(users, query) {
  const searchedPosts = useMemo(() => {
    return users.filter((user) => searchInUser(user, query));
  }, [users, query]);
  return searchedPosts;
}

export default useUsers;
