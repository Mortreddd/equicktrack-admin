import { Equipment, Remark } from "./Equipment";
import { User } from "./User";

export interface Transaction {
  id: number;
  userId?: number;
  equipmentId?: number;
  purpose?: string | null;
  borrowDate: string;
  returnDate: string;
  createdAt: string;
  updatedAt?: string | null;
  returnedAt?: string | null;
  remark?: Remark;
  user?: User;
  notifiedAt: string | null;
  conditionImage: string | null;
  equipment?: Equipment;
}
