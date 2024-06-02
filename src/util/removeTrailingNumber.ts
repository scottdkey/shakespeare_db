/**
 * Removes a trailing number from the given string.
 * @param text - The input string.
 * @returns The string without a trailing number.
 */
export const removeTrailingNumber = (text: string): string => {
  return text.replace(/\d+$/, '');
};