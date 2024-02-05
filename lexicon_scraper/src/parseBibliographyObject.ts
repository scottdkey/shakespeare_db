export function parseBibl(bibl: { "#text": string }) {
  const splitString = bibl['#text'].split(" ")

  const act = (): number => {
    const val = splitString[1].split(",")[0]
    if (val == "I") return 1
    if (val == "II") return 2
    if (val == "III") return 3
    if (val == "IV") return 4
    if (val == "V") return 5
    return parseInt(val)
  }

  const getLine = () => {
    try {
      return parseInt(splitString[3])
    } catch (e) {
      console.error(e)
      return 0
    }
  }
  return {
    text: "",
    play: splitString[0].split(".")[0].toLowerCase(),
    act: act(),
    scene: parseInt(splitString[2]),
    line: getLine()
  }
}