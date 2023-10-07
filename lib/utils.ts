import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFloorName(floorNo: number) {
  if (floorNo === 0) return "Ground floor";
  var j = floorNo % 10,
    k = floorNo % 100;
  if (j == 1 && k != 11) {
    return floorNo + "st floor";
  }
  if (j == 2 && k != 12) {
    return floorNo + "nd floor";
  }
  if (j == 3 && k != 13) {
    return floorNo + "rd floor";
  }
  return floorNo + "th floor";
}
