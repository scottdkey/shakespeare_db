import { test } from '@playwright/test';
import fs from "fs"
import { xmlParser } from '../src/parsers/xmlParser';

const urlPrefix = 'https://www.perseus.tufts.edu/hopper'




test('scrape', async ({ page }) => {
  test.setTimeout(620000)
  await page.goto('https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.03.0079');
  let currentCount = 0
  const maxRecords = 50
  const returnValues: any[] = []
  //only get limited number of values in development
  while (currentCount <= maxRecords) {
    const xmlPath = await page.locator('#footer_nav').getByRole("link", { name: 'view as XML' }).getAttribute('href')
    const xmlFile = await page.goto(`${urlPrefix}/${xmlPath}`)
    const xmlBody = await xmlFile?.body()
    currentCount++

    if (xmlBody) {
      const parsedXml = xmlParser(xmlBody)
      returnValues.push(parsedXml)
      // console.log(parsedXml, 'do something with this value to save to db')

    } else {
      console.warn('no xml body detected')
    }
    await page.goBack()


    await page.locator('#footer_nav').getByRole("link", { name: 'next' }).click()

  }
  // console.log({ returnValues: JSON.stringify(returnValues, null, 2) })
  fs.writeFileSync('./data.json', JSON.stringify(returnValues, null, 2))
});







