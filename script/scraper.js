const puppeteer = require('puppeteer');

const waitMilli = 5000;


async function run({sourceUrl, save}) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(sourceUrl);

    await page.waitFor(waitMilli);

    const countriesDataId = await page.evaluate(retrieveCountriesDataId);

    for (let countryDataId of countriesDataId) {

        await page.click('div[class="GycLre"] div[jscontroller="Dk9Hzf"]');

        await page.click(`div[class="GycLre"] div[jscontroller="Dk9Hzf"] li[data-id="${countryDataId.dataId}"]`);

        await page.waitFor(waitMilli);

        const data = await page.evaluate(retrieveDataFromTable);

        console.log(`${countryDataId.country} with ${data.length} provinces `);

    }


    await browser.close();
}


function retrieveCountriesDataId() {

    const countries = document.querySelectorAll('div[class="GycLre"] div[jscontroller="Dk9Hzf"] li');

    return Array.from(countries)
        .map(c => {
            return {
                country: c.innerText,
                dataId: c.getAttribute('data-id')
            }
        })
        .filter(c => c.country !== '')
        .filter(c => c.country !== 'Worldwide')
}


function retrieveDataFromTable() {

    const result = document.getElementsByClassName('pH8O4c')[0].rows;

    let rows = Array.from(result)
        .map(v => v.cells)
        .filter(v => v[0].innerText !== 'Location')
        .filter(v => v[0].innerText !== 'Worldwide')
    ;

    let countries = [];

    for (let country of rows) {

        countries.push({
            location: country[0].innerText,
            confirmed: country[1].innerText,
            casesPer1M: country[2].innerText,
            recovered: country[3].innerText,
            death: country[4].innerText
        })
    }

    return countries
}


(async () => {

    await run('https://news.google.com/covid19/map?hl=en-US&gl=US&ceid=US:en');

})();
