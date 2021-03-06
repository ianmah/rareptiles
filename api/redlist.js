const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://www.iucnredlist.org/species/22697789/131879000';

const speciesURLs = [];
const animalObjects = [];

// read csv

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  await page.goto(url)
  
  try {
    const img = await page.$eval('.featherlight__gallery__image > img', el => el.getAttribute("src"))
    const commonName = await page.$eval('.headline__title', el => el.textContent)
    const scientificName = await page.$eval('.featherlight__gallery__image > img', el => el.getAttribute("alt"))
    const assessment = await page.$eval('a[href="/search?redListCategory=en&searchType=species"]', el => el.textContent)
    
    // get hd image without watermark
    const hdImg = img.replace("https://wir.iucnredlist.org/", "https://s2r.iucnredlist.org/sis2_images/");
    // console.log(hdImg)
    // console.log(commonName)
    // console.log(scientificName)
    // console.log(assessment)

    animalObjects.push({
      commonName,
      scientificName,
      assessment,
      hdImg
    });

    await browser.close()
    return;
  } catch {
    console.log('no image found')
    await browser.close()
  }  
})()