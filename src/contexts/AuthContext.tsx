import { createContext, useContext } from "react";
import { User } from "../types/User";
import { AxiosResponse } from "axios";
import { JwtTokenResponse } from "@/types/Auth";

interface LoginProps {
  email: string;
  password: string;
}

interface RegisterProps {
  fullName: string;
  email: string;
  password: string;
  roleId: number;
  contactNumber: string;
}

interface AuthContextProps {
  currentUser: User | null;
  isVerifiedUser: boolean;
  performLogin: ({
    email,
    password,
  }: LoginProps) => Promise<AxiosResponse<JwtTokenResponse>>;
  performLogout: () => void;
  performRegister: ({
    fullName,
    email,
    password,
    roleId,
    contactNumber,
  }: RegisterProps) => Promise<AxiosResponse<JwtTokenResponse>>;
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
