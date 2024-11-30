import { createContext, useContext } from "react";
import { User } from "../types/User";
import { AxiosResponse } from "axios";
import { JwtTokenResponse } from "@/types/Auth";

export interface LoginProps {
  email: string;
  password: string;
}

export interface RegisterProps {
  fullName: string;
  email: string;
  password: string;
  idNumber: string;
  roleId: number;
}

interface AuthContextProps {
  currentUser: User | null;
  isVerifiedUser: boolean;
  performLogin: ({
    email,
    password,
  }: LoginProps) => Promise<AxiosResponse<JwtTokenResponse>>;
  performLogout: () => void;
  performRegister: (authToken: string) => void;
  loading: boolean;
  authToken: null | string;
  loadUser(): Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthContext, useAuth };
