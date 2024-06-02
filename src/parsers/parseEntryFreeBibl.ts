import { ensureArray } from "../util/ensureArray"

export const parseEntryFreeBibl = (bibl?: Bibl[] | Bibl): BiblReturn[] => {
  if (bibl) {
    const parts = ensureArray(bibl).map(value => {

      const baseVal = {
        info: value._,
        n: value.$.n,
        // default: value.$.default,
        // valid: value.$.valid
      }


      const locationSplit = baseVal.n.split(" ")

      const title = locationSplit[1]
      const act = locationSplit[2] !== undefined ? locationSplit[2].split(".")[0] : ""
      const scene = locationSplit[2] !== undefined ? locationSplit[2].split(".")[1] : ""
      const line = locationSplit[2] !== undefined ? locationSplit[2].split(".")[2] : ""

      const splitInfo = baseVal.info.split(" ")

      const lineWIthFallBack = parseInt(line !== undefined ? line : splitInfo[splitInfo.length - 1])
      const isPoem = ["pp"].includes(title)
      const isSonnet = ["son"].includes(title)

      // if (line === undefined) {
      //   console.log({
      //     lineWIthFallBack,
      //     locationSplit,
      //     splitInfo,
      //     title,
      //     act: isPoem ? null : parseInt(act),
      //     scene: parseInt(scene),
      //     line: isPoem ? parseInt(act) : lineWIthFallBack,
      //   })
      // }


      return {
        // ...baseVal,
        title,
        // titleExpanded: getPlayName(title),
        act: isPoem ? null : parseInt(act),
        scene: parseInt(scene),
        line: isPoem ? parseInt(act) : lineWIthFallBack,
        // isPoem,
        // isSonnet
      }
    })

    return parts
  } else {
    return []
  }
}