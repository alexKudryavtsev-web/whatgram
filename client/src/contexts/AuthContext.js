import { createContext } from "react";

function noop() {}

const authContext = createContext({
  token: null,
  user: null,
  login: noop,
  logout: noop,
  calculateHeader: noop,
});

export default authContext;
