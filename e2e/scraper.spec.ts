import { test } from '@playwright/test';
import { parseString } from 'xml2js';
import fs from "fs"

const urlPrefix = 'https://www.perseus.tufts.edu/hopper'

test('scrape', async ({ page }) => {
  test.setTimeout(620000)
  await page.goto('https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.03.0079');
  let currentCount = 0
  const maxRecords = 5
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

// Function to ensure the value is always an array
const ensureArray = <T>(value: T | T[]): T[] => Array.isArray(value) ? value : [value];

const parseTEI = (data: TEI2) => {
  const div = data['TEI.2'].text.body.div1;
  const entryFree = ensureArray(div.entryFree);

  const cleanText = (text: string) => {
    if (!text) return '';
    return text
      .replace(/\\.+/g, '.') // Replace multiple periods with a single period
      .replace(/\s*(\.|,|;|:|\\(|\\))\s*/g, (match, p1) => ` ${p1} `) // Ensure one space before and after punctuation marks
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .replace(/\bi\.e\./g, 'i.e.') // Ensure "i.e." is not split
      .replace(/\.\s*\.\s*\./g, '.\n') // Replace ". . ." pattern (any length) with a period and a newline
      .replace(/\.\n\n+/g, '.\n') // Replace consecutive newlines with a single newline
      .replace(/\.\s*\(/g, '. (') // Ensure a space after a period before an opening parenthesis
      .replace(/\)\s*\./g, '). ') // Ensure a space after a closing parenthesis before a period
      .trim();
  };

  const parseBiblText = (biblText: string) => {
    if (!biblText) return {};
    const parts = biblText.split(/[, ]+/);
    const [play, act, scene, ...lines] = parts;
    return { play, act, scene, lines: lines.join(' ') };
  };

  return entryFree.map((entry) => {
    const bibl = ensureArray(entry.bibl).map((b) => ({
      text: cleanText(b?._ || ''),
      n: b?.$.n,
      default: b?.$.default,
      valid: b?.$.valid,
      ...parseBiblText(b?._ || ''),
    }));

    return {
      key: entry.$.key,
      type: entry.$.type,
      opt: entry.$.opt,
      text: cleanText(entry?._ || ''),
      orth: entry.orth ? cleanText(entry.orth?._ || '') : null,
      orthExtent: entry.orth && entry.orth.$ ? entry.orth.$.extent : null,
      orthOpt: entry.orth && entry.orth.$ ? entry.orth.$.opt : null,
      bibl,
    };
  });
};


const xmlParser = (xmlString: Buffer) => {
  let parsedEntry: any = null
  parseString(xmlString, { trim: true, explicitArray: false }, (err: Error | null, result: TEI2) => {
    if (err) {
      throw err;
    }

    // Resulting JavaScript object
    const parsedData: TEI2 = result;

    parsedEntry = parseTEI(parsedData)
  });

  return parsedEntry
}

