const puppeteer = require('puppeteer');
const $ = require('cheerio');

const speciesUrls = [];
const animalObjects = [];

// read csv
const csv = require('csv-parser')
const fs = require('fs');
const results = [];

// can pass in any csv
fs.createReadStream('assessments.csv')
  .pipe(csv({ headers: ['internalTaxonId', 'assessmentId', 'scientificName', 'redlistCategory'],
              skipLines: 1}))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    results.map((row) => {
      speciesUrls.push(
        {
          // assessmentId and internalTaxonId might be flipped for other species 
          url: `https://www.iucnredlist.org/species/${row.assessmentId}/${row.internalTaxonId}`,
          internalTaxonId: row.internalTaxonId,
          assessmentId: row.assessmentId,
          scientificName: row.scientificName,
          redlistCategory: row.redlistCategory
        })
    })
    // console.log(speciesUrls);
    scrape().then((animals) => {
      var stringify = require('csv-stringify');
        
      stringify(animals, {
          header: true
      }, function (err, output) {
          fs.writeFileSync('result.csv', output);
      })
    }).catch(e => console.log(e));
  });

async function scrape() {
  console.log('scraping!')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  for (let index = 0; index < speciesUrls.length; index++){
    try {
      await page.goto(speciesUrls[index].url)
      await new Promise(resolve => setTimeout(resolve, 1000));

      const img = await page.$eval('.featherlight__gallery__image > img', el => el.getAttribute("src"))
      const commonName = await page.$eval('.headline__title', el => el.textContent)

      // get hd image without watermark
      const hdImg = img.replace("https://wir.iucnredlist.org/", "https://s2r.iucnredlist.org/sis2_images/");
      animalObjects.push({
        commonName,
        scientificName: speciesUrls[index].scientificName,
        assessment: speciesUrls[index].redlistCategory,
        hdImg
      });
    } catch (e) {
      console.log('No image found', e)
      console.log(speciesUrls[index].url)
    }
  }
  console.log(animalObjects)

  await browser.close()
  return animalObjects;
}