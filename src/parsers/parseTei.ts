
import { cleanText } from "../util/cleanText";
import { ensureArray } from "../util/ensureArray";
import { parseBiblText } from "./parseBiblText";
import { parseSchmidtLexicon } from "../util/schmidtLexParser";
import { removeTrailingComma } from "../util/removeTrailingComma";
import { removeTrailingNumber } from "../util/removeTrailingNumber";

/**
 * 
 * @param data as far as I've been able to pick apart the perseus data structure for their xmls for the lexicon. 
 * @returns a somewhat parsed(improving every day.)
 */
export const parseTEI = (data: TEI2) => {
  const div = data['TEI.2'].text.body.div1;
  const entryFree = ensureArray(div.entryFree);


  return entryFree.map((entry) => {
    const bibl = ensureArray(entry.bibl).map((b) => ({
      text: cleanText(b?._ || ''),
      n: b?.$.n,
      default: b?.$.default,
      valid: b?.$.valid,
      ...parseBiblText(cleanText(b?._ || ''), b?.$.n),
    }));


    const parseValue = (value: string, key: string) => {
      const fallbackValue = removeTrailingNumber(key)
      const current = removeTrailingComma(value ?? fallbackValue)

      return current

    }

    console.log(
      { ...entry.$, value: parseValue(entry.orth._, entry.$.key) }
    )

    return {
      type: entry.$.type,
      opt: entry.$.opt,
      value: entry.orth && entry.orth._ ? removeTrailingComma(entry.orth._) : null,
      valueKey: entry.$.key,
      schmidt: parseSchmidtLexicon(entry?._).map((v, i) => {
        return { ...v, bibl: bibl[i] }
      }),
      orthExtent: entry.orth && entry.orth.$ ? entry.orth.$.extent : null,
      orthOpt: entry.orth && entry.orth.$ ? entry.orth.$.opt : null,
    };
  });
};