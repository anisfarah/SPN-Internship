import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classnames with optional className.
 * @param inputs Tailwind classnames to merge.
 * @param className Optional className to merge with Tailwind classnames.
 * @returns Merged classnames as a space-separated string.
 */
function cn(...inputs: (string | null | undefined)[]): string {
  return twMerge(clsx(inputs)) as string;
}
export default cn;
