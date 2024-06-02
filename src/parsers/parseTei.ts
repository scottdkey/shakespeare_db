import { removeTrailingComma } from "../util/removeTrailingComma";
import { removeTrailingNumber } from "../util/removeTrailingNumber";
import { parseCitations } from "./parseCitation";
import { parseDescription } from "./parseDescription";
import { parseEntryFreeBibl } from "./parseEntryFreeBibl";








/**
 * 
 * @param data as far as I've been able to pick apart the perseus data structure for their xmls for the lexicon. 
 * @returns a somewhat parsed(improving every day.)
 */
export const parseTEI = (data: TEI2) => {
  const entry = data['TEI.2'].text.body.div1;
  // this is the XML data with types

  const bibl = parseEntryFreeBibl
    (entry.entryFree.bibl)

  if (entry) {
    // this is the XML data remapped to new data structure
    const mappedObject = {
      key: entry.entryFree.$.key,
      value: entry.entryFree.orth._ ? removeTrailingComma(entry.entryFree.orth._) : removeTrailingNumber(entry.entryFree.$.key),
      letterGrouping: entry.$.n,
      description: parseDescription(entry.entryFree._, bibl),
      emph: entry.entryFree.emph,
      citations: parseCitations(entry.entryFree.cit),


    }

    // console.log({
    //   original: entry,
    //   mappedObject
    // })

    return {
      original: entry,
      mappedObject
    }
  }





  // const mappedValues = entryFree.map((entry) => {

  //   const returnValue = {
  //     original: entry
  //   };
  //   console.log(JSON.stringify({ ...returnValue }, null, 2))

  //   return returnValue;
  // })

  console.log('no data found', entry)
}