import { Transaction } from "./Transactions";
import { Role } from "./Role";
export interface UserPaginated {
  data: User[];
  total: number;
  page: number;
  perPage: number;
}

export interface User {
  id: number;
  googleUuid: string | null;
  fullName: string;
  email: string;
  photoUrl: string | null;
  contactNumber: string;
  password?: string;

  emailVerified: string;
  createdAt: string;
  updatedAt: string | null;

  transactions?: Transaction[];
  authorities?: Role[];
  roles?: Role[];
}
