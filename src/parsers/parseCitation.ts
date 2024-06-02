import { getPlayName } from "../data/playNames"
import { ensureArray } from "../util/ensureArray"

/**
 * 
 * @param cit 
 * @returns 
 */
export const parseCitations = (cit?: Cit[]) => {
  if (cit !== undefined) {

    const workingValue =
      ensureArray(cit)
    const returnValue = workingValue.map(val => {
      const split = val.bibl.$.n.split(" ")

      const lineSplit = val.bibl._.split(" ")

      const title = split[1]
      const line = lineSplit[lineSplit.length - 1]
      const act = split[2] && split[2].split('.')[0]
      const scene = split[2] && split[2].split(".")[1]

      const isSonnet = title === 'son'
      const isPoem = title === 'pp'

      if (line === undefined) {
        console.error({
          line,
          split: lineSplit
        }, 'line is undefined and it it should not be')
      }

      return {
        quote: val.quote,
        sonnet: isSonnet ? parseInt(act) : undefined,
        line: isSonnet ? parseInt(scene) : parseInt(line),
        act: isSonnet ? undefined : parseInt(act),
        scene: isSonnet ? undefined : parseInt(scene),
        title,
        isSonnet,
        isPoem
        // titleExpanded: getPlayName(title)
        // val

      }
    })

    return returnValue

  } else {
    return []
  }

}