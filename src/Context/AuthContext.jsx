import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem("isLoggedIn") === "true"
  );

  const login = useCallback((user) => {
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
  }, []);

  const value = useMemo(
    () => ({ isLoggedIn, login, logout }),
    [isLoggedIn, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}