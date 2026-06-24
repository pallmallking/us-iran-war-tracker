import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInDays, format, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WAR_START_DATE = new Date("2026-02-28T00:00:00Z");

export function getWarDay(date = new Date()) {
  return differenceInDays(date, WAR_START_DATE) + 1;
}

export function formatTimestamp(iso: string) {
  try {
    return format(parseISO(iso), "MMM d, yyyy HH:mm 'UTC'");
  } catch {
    return iso;
  }
}

export function formatDate(iso: string) {
  try {
    return format(parseISO(iso), "MMM d, yyyy");
  } catch {
    return iso;
  }
}
