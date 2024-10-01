import { createContext, useContext } from "react";
import { User } from "../types/User";
import { AxiosResponse } from "axios";

interface LoginProps {
  email?: string;
  password?: string;
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
  performLogin: ({ email, password }: LoginProps) => Promise<void>;
  performLogout: () => void;
  performRegister: ({
    fullName,
    email,
    password,
    roleId,
    contactNumber,
  }: RegisterProps) => Promise<AxiosResponse>;
  loading: boolean;
  authToken: null | string;
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
