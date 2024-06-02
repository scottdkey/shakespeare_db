import { cleanText } from "./cleanText";
import { expandAbbreviations } from "./expandAbbreviations";


export const parseSchmidtLexicon = (text: string) => {
  return parseSchmidtLexiconResult(text.split(/\n/));
};

export const parseSchmidtLexiconResult = (lines: string[]): SchmidtResult[] => {
  const filteredLines = lines.filter(line => line.trim() !== '');

  return filteredLines.map((line, _): SchmidtResult => {
    let cleanedLine = cleanText(line);

    const parts = cleanedLine.split(':').map(part => part.trim());

    const e = parts.map(p => expandAbbreviations(p));
    const abbreviations: { [key: string]: string } = {};

    e.forEach((expansions) => {
      Object.entries(expansions).forEach(([abbr, expanded]) => {
        abbreviations[abbr] = expanded;
      });
    });

    return { parts, abbreviations };
  });
};