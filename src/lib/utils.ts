import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatCurrency = (amount: number | string , opts: Intl.NumberFormatOptions = {} ) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: opts.currency ?? 'USD',
    notation: opts.notation ?? 'compact',
  }).format(Number(amount));
}

// export const formatCurrency = (
//   amount: number | string = 0, // ဘာမှမပါရင် 0 လို့ ယူမယ်
//   currency: string = 'USD',    // Default က USD
//   notation: Intl.NumberFormatOptions['notation'] = 'standard' // Default က Standard
// ) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency,
//     notation,
//     maximumFractionDigits: 2,
//   }).format(Number(amount) || 0); // NaN ဖြစ်ရင် 0 ပြပေးမယ်
// };