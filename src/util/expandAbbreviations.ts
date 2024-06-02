import { abbreviationLookup } from "../data/abbreviations";

/**
 * A function to check against a known list of abbreviations and attempt to supply context.
 * Improved to enhance detection.
 * @param text string of text to check for abbreviations
 * @returns an object with discovered abbreviations
 */
export const expandAbbreviations = (text: string): { [key: string]: string } => {
  const expansions: { [key: string]: string } = {};
  const lowerCaseText = text.toLowerCase();

  // Iterate over abbreviation patterns and check for matches
  for (const [abbr, { pattern, description }] of Object.entries<Abbreviation>(abbreviationLookup)) {
    let match;
    // Use global and case-insensitive flags to find all matches
    const regex = new RegExp(pattern.source, 'gi');
    while ((match = regex.exec(lowerCaseText)) !== null) {
      expansions[abbr] = description;
    }
  }

  return expansions;
};