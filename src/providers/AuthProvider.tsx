import { FC, PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { User } from "../types/User";
import { ADMIN_API } from "../utils/Api";
import { AxiosError, AxiosResponse } from "axios";
import { JwtTokenResponse } from "@/types/Auth";
import { ErrorResponse } from "@/types/Models";

type AuthProviderProps = PropsWithChildren;

interface LoginProps {
  email?: string;
  password?: string;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isVerifiedUser =
    authToken !== null &&
    currentUser !== null &&
    currentUser.emailVerifiedAt !== null;

  useEffect(() => {
    async function loadCurrentUser() {
      if (!authToken) return;
      await loadUser();
    }

    if (authToken !== null) {
      loadCurrentUser();
    }
  }, [authToken]);

  async function loadUser(): Promise<void> {
    await ADMIN_API.get("/auth/me", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: AxiosResponse<User>) => {
        setCurrentUser(response.data);
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        if (error.status === 401) {
          setAuthToken(null);
          localStorage.removeItem("token");
          setCurrentUser(null);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function performLogin({
    email,
    password,
  }: LoginProps): Promise<AxiosResponse<JwtTokenResponse>> {
    try {
      setLoading(true);
      const response = await ADMIN_API.post<
        LoginProps,
        AxiosResponse<JwtTokenResponse>
      >(
        "/auth/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { accessToken } = response.data;
      console.log("Access Token:", accessToken);
      setAuthToken(accessToken);
      localStorage.setItem("token", accessToken);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
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

  async function performRegister(authToken: string) {
    setAuthToken(authToken);
    localStorage.setItem("token", authToken);
  }

  return (
    <AuthContext.Provider
      value={{
        isVerifiedUser,
        currentUser,
        authToken,
        loading,
        performLogin,
        performLogout,
        performRegister,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
