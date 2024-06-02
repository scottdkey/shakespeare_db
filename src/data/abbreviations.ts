export const abbreviationLookup: { [key: string]: Abbreviation } = {
  "Qq.": { pattern: /\bQq\.\b/g, description: "Quartos" },
  "Q": { pattern: /\bQ\b(?!\.)/g, description: "Quarto" }, // Ensure Q is detected but not followed by a dot
  "Ff": { pattern: /\bFf\b/g, description: "First Folio" },
  "F": { pattern: /\bF\b(?!\.)/g, description: "Folios" }, // Ensure F is detected but not followed by a dot
  "f. i.": { pattern: /\bf\. i\.\b/g, description: "for instance" },
  "cf.": { pattern: /\bcf\.\b/g, description: "compare" },
  "i. e.": { pattern: /\bi\. e\.\b/g, description: "in example" },
  "q. v.": { pattern: /\bq\. v\.\b/g, description: "which see" },
  "M. Edd.": { pattern: /\bM\. Edd\.\b/g, description: "Modern Editors" },
  "auth.": { pattern: /\bauth\.\b/g, description: "authentic" },
  "om.": { pattern: /\bom\.\b/g, description: "omitted" },
  "ger.": { pattern: /\bger\.\b/g, description: "gerunds" },
  "art.": { pattern: /\bart\.\b/g, description: "article" },
  "ind.": { pattern: /\bind\.\b/g, description: "indefinite" },
  // Add more patterns as needed
};