import { test } from '@playwright/test';
import { parseString } from 'xml2js'

const urlPrefix = 'https://www.perseus.tufts.edu/hopper'

test('test', async ({ page }) => {

  await page.goto('https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.03.0079');
  let shouldContinue = true;
  while (shouldContinue) {
    const xmlPath = await page.locator('#footer_nav').getByRole("link", { name: 'view as XML' }).getAttribute('href')
    const xmlFile = await page.goto(`${urlPrefix}/${xmlPath}`)
    const xmlBody = await xmlFile?.body()
    let parsedXml: any | null = null
    if (xmlBody && shouldContinue === true) {
      parseString(xmlBody, (err, result) => {
        console.dir(JSON.stringify(result, null, 2), err);
        if (err) {
          shouldContinue = false
          throw err
        }
        shouldContinue = true
        parsedXml = result
      })
    } else {
      console.log('no xml found, may be at end')
      shouldContinue = false
    }

    console.log(parsedXml, 'do something with this value to save to db')

    await page.goBack()
    await page.locator('#footer_nav').getByRole("link", { name: 'next' }).click()
  }

});