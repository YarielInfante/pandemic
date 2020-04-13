const puppeteer = require('puppeteer');
const {database, country} = require('../src/database/models');
const CountryRepository = require('../src/repositories/CountryRepository');
const CaseRepository = require('../src/repositories/CaseRepository');
const logger = require('../config/logging/logger');

const waitMilli = 5000;


async function run(sourceUrl) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(sourceUrl);

    await page.waitFor(waitMilli);

    const countriesDataId = await page.evaluate(retrieveCountriesDataId);

    for (let i = 0; i < countriesDataId.length; i++) {
        const countryDataId = countriesDataId[i];

        const transaction = await country.sequelize.transaction();

        try {

            let countryFound = await CountryRepository.getByName(countryDataId.country, transaction);
            if (!countryFound) {
                logger.info('saving');
                countryFound = await CountryRepository.add({name: countryDataId.country}, transaction);
            }

            await page.click('div[class="GycLre"] div[jscontroller="Dk9Hzf"]');

            await page.click(`div[class="GycLre"] div[jscontroller="Dk9Hzf"] li[data-id="${countryDataId.dataId}"]`);

            await page.waitFor(waitMilli);

            const data = await page.evaluate(retrieveDataFromTable);

            data.forEach(r => r.countryId = countryFound.id);

            await CaseRepository.addBulk(data);

            logger.info(`${countryDataId.country} with ${data.length} provinces `);

            await transaction.commit();

        } catch (e) {
            logger.error(e);
            await transaction.rollback();
        }
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
            };
        })
        .filter(c => c.country !== '')
        .filter(c => c.country !== 'Worldwide');
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
            confirmed: country[1].innerText.replace(',', '').replace('—', '0'),
            casesPer1M: country[2].innerText.replace(',', '').replace('—', '0'),
            recovered: country[3].innerText.replace(',', '').replace('—', '0'),
            death: country[4].innerText.replace(',', '').replace('—', '0'),
        });
    }

    return countries;
}


(async () => {

    await database.authenticate();

    await run(process.argv[3]);

})();
