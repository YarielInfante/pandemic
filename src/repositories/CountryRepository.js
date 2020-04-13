const CountryMapper = require('./mappers/CountryMapper');
const {country: CountryModel} = require('../database/models');

class CountryRepository {

    static async add(country, transaction) {

        const countryCreated = await CountryModel.create(CountryMapper.toDatabase(country), transaction);

        return CountryMapper.toEntity(countryCreated);
    }

    static async getByName(name, transaction) {

        const found = await CountryModel.findOne({where: {name}}, transaction);

        return found ? CountryMapper.toEntity(found) : undefined;
    }
}

module.exports = CountryRepository;
