import puppeteer from "puppeteer";
import { XMLParser } from "fast-xml-parser";
import { formatResult } from "./formatXml.js";



const perseusBaseUrl = 'https://www.perseus.tufts.edu/hopper'
const startingPath = `${perseusBaseUrl}/text?doc=Perseus%3Atext%3A1999.03.0079%3Aalphabetic+letter%3DA%3Aentry+group%3D1%3Aentry%3DA1`
const parser = new XMLParser({
  alwaysCreateTextNode: true,
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  attributesGroupName: "@_",
  removeNSPrefix: false,
  allowBooleanAttributes: true,
  commentPropName: "#comment",
  preserveOrder: true,
  // parseTagValue: true,
})





const getEntryValue = async (url: string) => {
  try {
    // console.log(`loading started ${url}`)
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    let returnObject: {
      xmlUrl: string | null,
      data: {},
      nextPage: string | null,
    } = {
      xmlUrl: null,
      data: {},
      nextPage: null
    }

    const xmlUrl = await page.$eval('#main #content #center_col #text_footer #footer_nav .xml', async (element) => {
      return await element.getAttribute("href")
    });

    const arrowUrl = await page.$$eval('#main #content #center_col #text_footer #footer_nav .arrow', async (element) => {
      return await element.map(value => value.getAttribute("href"))
    });
    let xmlUrlToParse: string | null = null
    // let backUrl: string | null = null
    let forwardUrl: string | null = null
    let parsedJson: any | null = null

    if (xmlUrl) xmlUrlToParse = `${perseusBaseUrl}/${xmlUrl}`
    if (arrowUrl) {
      if (arrowUrl.length > 1) {
        // backUrl = `${perseusBaseUrl}/${arrowUrl[0]}`
        forwardUrl = `${perseusBaseUrl}/${arrowUrl[1]}`
      }
      if (arrowUrl.length === 1 && url === startingPath) {
        forwardUrl = `${perseusBaseUrl}/${arrowUrl[0]}`
      }
      if (arrowUrl.length === 1 && url !== startingPath) {
        forwardUrl = null
      }
    }
    if (xmlUrlToParse) {
      const xmlPageData = await fetch(xmlUrlToParse)

      const xmlData = await xmlPageData?.body?.getReader().read()

      const xmlStringValue = new TextDecoder().decode(xmlData?.value);
      // console.log(xmlStringValue)
      const parsedXml = parser.parse(xmlStringValue)[1]["TEI.2"]

      const result = formatResult(parsedXml)
      console.log(JSON.stringify(result, null, 2))
      parsedJson = result


    }



    returnObject = {
      data: parsedJson,
      xmlUrl: xmlUrlToParse,
      nextPage: forwardUrl,
    }
    await browser.close();

    return returnObject
  } catch (e) {
    console.error(e, 'unable to getEntryValue')
    throw e
  }
}


const main = async () => {
  // this is in place for development so I it doesn't run through everything
  let recordsRetrieved = 0
  const maxRecords = 3
  let nextPage: string | null = startingPath
  // const returnData: { entry: string, definition: { source: string, text: string }[], url: string }[] = []

  while (nextPage !== null && recordsRetrieved <= maxRecords) {
    const data = await getEntryValue(nextPage)
    nextPage = data.nextPage
    recordsRetrieved++
  }

}

await main()
