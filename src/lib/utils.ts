import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSerialNumber(companyId: number, userId: number) {
  // Pad company ID and user ID with zeros
  const paddedCompanyId = companyId.toString().padStart(2, '0');
  const paddedUserId = userId.toString().padStart(6, '0');
  return `${paddedCompanyId}${paddedUserId}`;
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Format as XXX-XXX-XXXX
  if (cleaned.length >= 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }
  return cleaned;
}