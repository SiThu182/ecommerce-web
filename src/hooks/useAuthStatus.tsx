import { useState, useEffect } from "react";

const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          import.meta.env.VITE_APP_BACKEND_URL + "/api/v1/customer-info",
          {
            credentials: "include", // Include cookies in the request
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data, "user auth");
          setIsLoggedIn(true);
          setUser(data);
        } else if (response.status === 401) {
          setIsLoggedIn(false); // Unauthorized
        } else {
          setError(`Unexpected error: ${response.status}`);
        }
      } catch (err) {
        // Handle network or other unexpected errors
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [isLoggedIn]); // Empty dependency array to run only once on mount

  return { isLoggedIn, user, loading, error, setIsLoggedIn };
};

export default useAuthStatus;
