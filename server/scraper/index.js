const puppeteer = require('puppeteer')
const nodemailer = require('nodemailer')
const cron = require('node-cron')

const scrapper = async (url) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const titleSelector = '#productTitle'
    await page.waitForSelector(titleSelector)
    const res = await page.evaluate(() => {
        const itemName = document.querySelector('#productTitle').innerText;
        const itemImage = document.querySelector("#imgTagWrapperId > img").src
        const itemPrice = parseFloat(document.querySelector('span.a-price > span').innerText.replace(/[^0-9.-]+/g, ""));

        return {
            itemName,
            itemImage,
            itemPrice,
            itemLink: url
        }
    })
    await browser.close()
    return res;
}

module.exports = scrapper