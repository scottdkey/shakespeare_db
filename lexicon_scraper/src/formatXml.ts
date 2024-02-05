import { parseBibl } from "./parseBibliographyObject.js";

export function formatResult(json: any) {
  return json.map((item: {
    text: {
      body: {
        div1: {
          entryFree: [{
            //this is the word for lookup
            orth?: { "#text": string }[]
            "#text"?: string,
            "emph"?: { "#text": string }[]
            "hi"?: { "#text": number }[]
            bibl?: { "#text": string }[]
            "cit": [
              {
                "quote": [
                  { "#text": string }]
              },
              {
                "bibl": [
                  { "#text": string }
                ]
              }]
          }]
        }[]
      }[]
    }[]
  }) => {
    return item.text.map(innerText => {
      return innerText.body.map(body => {
        return body.div1.map(div1 => {
          let word: string = ''
          let description: string[] = []
          let citations: {
            text: string,
            source?: string,
            act?: number,
            scene?: number,
            line?: number
          }[] = []
          let currentGroup = false
          let currentGroupIndex = -1


          // this loops over the array of entries, but there is only ever one item in the array
          for (const entry of div1.entryFree) {
            //this gets the word for the entry, i.e. "Apple"
            if (entry.orth) {
              entry.orth.forEach(orth => {
                word = orth['#text'].split(",")[0]
              })
            }

            // this gets part of the description and moves on to the next array object. 

            //will ignore any entry that is just a period to make data cleaner later
            if (entry["#text"]) {
              if (entry["#text"] !== ".") {
                currentGroup = true
                description.push(entry["#text"])
                currentGroupIndex++
              }

            }
            // part of the xml to add emphasis, but just adding the description together for now, may decide to put markdown emphasis around this
            //to-do: need to decide if this should retain some kind of emphasis demarcation.
            if (entry["emph"]) {
              entry["emph"].forEach(emph => {
                description[currentGroupIndex] = (`${description[currentGroupIndex]} ${emph["#text"]}`)
              })
            }
            //if bibliography is detected format that string
            if (entry['bibl']) {
              entry["bibl"].forEach(bibl => {
                const data = parseBibl(bibl)
                citations.push(data)
              })
            }

          }
          // console.log(JSON.stringify({ word, description: description.join(" "), citations }, null, 2))
          return {
            word,
            description: description.join(" "),
            citations
          }

        })
      })
    })
  })
}