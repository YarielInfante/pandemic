class CaseMapper {

    static toEntity({dataValues}) {

        const {id, confirmed, casesPer1M, recovered} = dataValues;

        return {
            id,
            confirmed,
            casesPer1M,
            recovered
        };
    }

    static toDatabase(entity) {
        return {
            id: entity.id,
            location: entity.location,
            countryId: entity.countryId,
            confirmed: entity.confirmed,
            casesPer1M: entity.casesPer1M,
            recovered: entity.recovered,
            death: entity.death
        };
    }
}

module.exports = CaseMapper;
