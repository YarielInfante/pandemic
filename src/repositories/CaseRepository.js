const {case: CaseModel} = require('../database/models');
const CaseMapper = require('./mappers/CaseMapper');

class CaseRepository {

    static async addBulk(casesEntity, transaction) {

        const caseCreated = await CaseModel.bulkCreate(casesEntity.map(CaseMapper.toDatabase), transaction);

        return caseCreated.map(CaseMapper.toEntity);
    }
}

module.exports = CaseRepository;
