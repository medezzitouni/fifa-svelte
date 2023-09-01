import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
// import { z, ZodTypeAny } from 'zod';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
export const truncate = (str: string) => str.length > 17 ? str.slice(0, 14) + '...' : str;