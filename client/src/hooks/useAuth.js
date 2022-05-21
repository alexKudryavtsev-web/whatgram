import { useCallback, useEffect, useState } from "react";

const STORAGE_NAME = "userData";

export default function useAuth() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = useCallback((inputToken, inputUser) => {
    localStorage.setItem(
      STORAGE_NAME,
      JSON.stringify({ user: inputUser, token: inputToken })
    );

    setToken(inputToken);
    setUser(inputUser);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);

    localStorage.removeItem(STORAGE_NAME);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_NAME));
    if (data && data.token) {
      login(data.token, data.user);
    }
  }, [login]);

  function calculateHeader() {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  return { login, logout, token, user, calculateHeader };
}
