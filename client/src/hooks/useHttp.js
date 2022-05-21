import { useCallback, useState } from "react";

export default function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}, auth) => {
      setIsLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }
        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        if (response.status === 401) {
          const refreshReponse = await fetch("/api/auth/refresh", {
            method: "GET",
          });
          const refreshData = await refreshReponse.json();

          auth.login(refreshData.tokens.accessToken, refreshData.user);
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Oops, something went wrong!");
        }
        setIsLoading(false);
        return data;
      } catch (e) {
        setIsLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  function clearError() {
    setError(null);
  }

  return {
    isLoading,
    request,
    error,
    clearError,
  };
}
