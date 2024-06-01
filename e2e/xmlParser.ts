import { parseString } from "xml2js";
import { parseTEI } from "./parseTei";

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
