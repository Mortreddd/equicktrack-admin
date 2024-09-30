import { FC, PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { User } from "../types/User";
import { ADMIN_API } from "../utils/Api";

interface AuthProviderProps extends PropsWithChildren {}

interface LoginProps {
  email?: string;
  password?: string;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        const response = await ADMIN_API.get<User>("/users/me", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        setCurrentUser(response.data);
      } catch (error) {
        setCurrentUser(null);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (authToken === null) {
      loadUser();
    }
  }, [authToken]);

  async function performLogin({ email, password }: LoginProps) {
    try {
      setLoading(true);
      const response = await ADMIN_API.post(
        "/auth/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const authToken = response.data;
      setAuthToken(authToken);
      localStorage.setItem("token", authToken);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function performLogout() {
    setLoading(true);
    localStorage.removeItem("token");
    setAuthToken(null);
    setCurrentUser(null);
    setLoading(false);
  }
  async function performRegister() {}

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        authToken,
        loading,
        performLogin,
        performLogout,
        performRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
