import { parseString } from "xml2js";
import { parseTEI } from "../parsers/parseTei";

/**
 * An XML Parser function to specifically parse the Tufts TEI format from the Perseus Shakespeare Lexicon
 * @param xmlString 
 * @returns 
 */
export const xmlParser = (xmlString: Buffer) => {
  let parsedEntry: any = null
  parseString(xmlString, { trim: true, explicitArray: false }, (err: Error | null, result: TEI2) => {
    if (err) {
      throw err;
    }

    // Resulting JavaScript object
    const parsedData: TEI2 = result;

    parsedEntry = parseTEI(parsedData)
  });

  return parsedEntry
}
