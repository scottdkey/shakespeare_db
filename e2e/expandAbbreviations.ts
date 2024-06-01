export const abbreviationLookup: { [key: string]: string } = {
  "Qq": "Quartos",
  "Q": "Quarto",
  "Ff": "First Folio",
  "F": "Folios",
  "f. i.": "for instance",
  "cf.": "compare",
  "i.e.": "in example",
  "q. v.": "which see",
  "M. Edd.": "Modern Editors",
  "auth.": "authentic",
  "om.": "omitted",
  "ger.": "gerunds",
  "f": "(for)",
  "i": "(indefinite)",
  "cf": "(compare with)"
};


export const expandAbbreviations = (text: string): { expandedText: string, expansions: { [key: string]: string } } => {
  const expansions: { [key: string]: string } = {};
  const expandedText = text.replace(/\b([A-Za-z]+\.{0,1})(\s|$)/g, (match, p1) => {
    const expanded = abbreviationLookup[p1.trim()];
    if (expanded) {
      expansions[p1.trim()] = expanded;
      return expanded + (match.endsWith(".") ? "." : ""); // Preserve period if present in original text
    } else {
      return match;
    }
  });
  return { expandedText, expansions };
};