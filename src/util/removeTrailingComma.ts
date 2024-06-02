/**
 * Removes a trailing comma from the given string.
 * @param text - The input string.
 * @returns The string without a trailing comma.
 */
export const removeTrailingComma = (text: string): string => {
  return text.replace(/,\s*$/, '');
};