import { Remark } from "@/types/Equipment";

export function capitalize(s: string): string {
  const loweredCase: string = s.toLowerCase();
  return loweredCase.charAt(0).toUpperCase() + loweredCase.slice(1);
}

export function parseRemark(remark: Remark) {
  const value: string = remark
    .split("_")
    .map((_v) => capitalize(_v))
    .join(" ");

  return value;
}

export function parseContactNumber(contactNumber: string) {
  return contactNumber.replace(/[^0-9]/g, "");
}

export function formatContactNumber(contactNumber: string) {
  if (contactNumber.length <= 10 || contactNumber.length > 11) {
    return contactNumber;
  }

  // parseValue
  const pv = parseContactNumber(contactNumber);

  return `${pv.slice(0, 4)}-${pv.slice(4 - 7)}-${pv.slice(7, 11)}`;
}

export function parseEnum(e: string) {
  return e
    .split("_")
    .map((_e) => capitalize(_e))
    .join(" ");
}
