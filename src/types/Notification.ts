import { User } from "./User";

export interface Notification {
  id: number;
  userId: number;
  message: string;
  createdAt?: string;
  updatedAt?: string;
  user?: User;
}
