import { abbreviationLookup } from "./abbreviationLookup";

/**
 * A function to check against known list of abbreviations and attempt to supply context.
 * Still a work in progress as it doesn't detect everything yet.
 * @param text string of text to check for abbreviations
 * @returns an object with discovered abbreviations
 */
export const expandAbbreviations = (text: string): { [key: string]: string } => {
  const expansions: { [key: string]: string } = {};

  // Iterate over abbreviation patterns and check for matches
  for (const [abbr, { pattern, description }] of Object.entries(abbreviationLookup)) {
    if (pattern.test(text)) {
      expansions[abbr] = description;
    }
  }

  return expansions;
};