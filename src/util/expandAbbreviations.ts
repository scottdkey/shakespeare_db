import { abbreviationLookup } from "../data/abbreviations";

/**
 * A function to check against known list of abbreviations and attempt to supply context.
 * @param text string of text to check for abbreviations
 * @returns an object with discovered abbreviations
 */
export const expandAbbreviations = (text: string): { [key: string]: string } => {
  const expansions: { [key: string]: string } = {};

  // Normalize the text to avoid case sensitivity issues and ensure consistency
  const normalizedText = text.replace(/\s+/g, ' ').trim();

  // Iterate over abbreviation patterns and check for matches
  for (const [abbr, { pattern, description }] of Object.entries(abbreviationLookup)) {
    const matches = normalizedText.match(pattern);
    if (matches) {
      expansions[abbr] = description;
    }
  }

  return expansions;
};