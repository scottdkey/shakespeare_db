import { cleanText } from "./cleanText";
import { expandAbbreviations } from "./expandAbbreviations";


export const parseSchmidtLexicon = (text: string) => {
  return parseSchmidtLexiconResult(text.split(/\n/));
};

interface SchmidtResult {
  parts: string[]
  expansions: {
    [key: string]: string
  }
}

export const parseSchmidtLexiconResult = (lines: string[]) => lines.map((line, _): SchmidtResult => {
  const parts = line.split(':');
  const e = parts.map(p => expandAbbreviations(p).expansions)
  const expansions: { [key: string]: string } = {}

  for (const val of e) {
    const entries = Object.entries(val)
    entries.forEach(e => {
      expansions[e[0]] = e[1]
    })
  }



  return { parts: parts.map(p => cleanText(p)), expansions };
})

