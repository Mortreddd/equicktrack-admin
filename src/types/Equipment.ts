import { Transaction } from "./Transactions";

export enum Remark {
  GOOD_CONDITION = "GOOD_CONDITION",
  SLIGHTLY_DAMAGED = "SLIGHTLY_DAMAGED",
  MODERATELY_DAMAGED = "MODERATELY_DAMAGED",
  SEVERELY_DAMAGED = "SEVERLY_DAMAGED",
}

export interface Equipment {
  id: number;
  name: string;
  description: string | null;
  equipmentImage: string;
  qrcodeImage: string;
  qrcodeData: string;
  remark: Remark;
  available: boolean;
  createdAt: string;
  updatedAt: string;

  transactions?: Transaction[];
}
