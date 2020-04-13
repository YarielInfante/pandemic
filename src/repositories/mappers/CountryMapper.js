class CountryMapper {

    static toEntity({dataValues}) {

        const {id, name} = dataValues;

        return {
            id,
            name
        };
    }

    static toDatabase(entity) {
        return {
            name: entity.name
        };
    }
}

module.exports = CountryMapper;
