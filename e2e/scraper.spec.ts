import { test } from '@playwright/test';
import fs from "fs"
import { xmlParser } from '../src/parsers/xmlParser';

const urlPrefix = 'https://www.perseus.tufts.edu/hopper'
const firstLetterOfLexicon = 'text?doc=Perseus%3Atext%3A1999.03.0079'




test('scrape', async ({ page }) => {
  let previousLetter: string | null = null
  let currentLetter: string | null = firstLetterOfLexicon
  let nextLetter: string | null = null
  test.setTimeout(620000)
  await page.goto(`${urlPrefix}/${currentLetter}`);
  let currentCount = 0
  const maxRecords = 50
  const returnValues: any[] = []
  //only get limited number of values in development
  while (currentCount <= maxRecords) {
    const xmlPath = await page.locator('#footer_nav').getByRole("link", { name: 'view as XML' }).getAttribute('href')


    // if (previousLetter !== null) {
    //   previousLetter = await page.locator('#footer_nav').getByRole("link", { name: 'previous' }).getAttribute('href')
    // }


    nextLetter = await page.locator('#footer_nav').getByRole("link", { name: 'next' }).getAttribute('href')

    const xmlFile = await page.goto(`${urlPrefix}/${xmlPath}`)
    const xmlBody = await xmlFile?.body()
    currentCount++



    if (xmlBody) {
      const parsedXml = xmlParser(xmlBody)

      const returnValue = {
        entry: { ...parsedXml },
        previousLetter,
        currentLetter,
        nextLetter,
      }
      // console.log(JSON.stringify(returnValue, null, 2))
      returnValues.push(returnValue)

    } else {
      console.warn('no xml body detected')
    }
    await page.goBack()


    await page.locator('#footer_nav').getByRole("link", { name: 'next' }).click()
    previousLetter = currentLetter
    currentLetter = nextLetter

  }
  // console.log({ returnValues: JSON.stringify(returnValues, null, 2) })
  fs.writeFileSync('./data.json', JSON.stringify(returnValues, null, 2))
});







