import { User } from "@/type/userType";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(1) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};


/**
 * 사용자 ID와 자신의 ID를 비교하여 사용자의 역할을 반환하는 함수
 * @param userid 비교할 사용자의 ID
 * @param self Clerk의 유저정보
 * @returns 사용자의 역할 (Leader 또는 Crew)
 */
export function getRole(userid: string, self: User): string {
  return userid === self.id ? "Leader" : "Crew";
}


