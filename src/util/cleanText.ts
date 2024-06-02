/**
 * This function will:
 * Remove any occurrences of ". . .";
 * Replace any remaining consecutive periods with a single period;
 * Ensure one space after punctuation marks: '. , ; :';
 * Remove any trailing punctuation followed by spaces;
 * Remove any leading or trailing spaces;
 * Remove extra whitespace between parentheses;
 * Remove " ." pattern;
 * Replace " )" with ")";
 * 
 * @param text input text to clean
 * @returns cleaned text
 */
export const cleanText = (text: string) => {
  if (!text) return '';

  // Remove extra whitespace between periods
  text = text.replace(/\)\s+\(/g, '. .');

  // Replace any remaining consecutive periods with a single period
  text = text.replace(/\.\s*\./g, '.');

  // Ensure one space after punctuation marks: . , ; :
  text = text.replace(/\s*([.,;:])\s*/g, '$1 ');

  // Remove any trailing punctuation followed by spaces
  // text = text.replace(/\s*([.,;:])\s*$/, '$1');

  // Remove any leading or trailing spaces
  text = text.trim();

  // Remove extra whitespace between parentheses
  text = text.replace(/\)\s+\(/g, ') (');

  // Remove " ." pattern
  text = text.replace(/ \./g, '');

  // Replace " )" with ")"
  text = text.replace(/ \)/g, ')');


  return text;
};