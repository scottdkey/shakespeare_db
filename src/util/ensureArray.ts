/**
 * A simple function to ensure that there will be an array
 * @param value any value or array value. 
 * @returns 
 */
export const ensureArray = <T>(value: T | T[]): T[] => Array.isArray(value) ? value : [value];