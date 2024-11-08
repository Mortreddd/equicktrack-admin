import { User } from "./User";

export interface AccessTokenResponse {
  status: number;
  message: string;
  accessToken?: string | null;
}

export interface LoginProps extends Pick<User, "email" | "password"> {}

export interface RegisterProps
  extends Pick<User, "fullName" | "contactNumber" | "email" | "password"> {}

export interface JwtTokenResponse {
  iss: string;
  iat: number;
  exp: number;
  accessToken: string;
}
