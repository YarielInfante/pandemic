'use strict';

module.exports = function (sequelize, DataTypes) {
    const Country = sequelize.define('country',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true },
            name: { type: DataTypes.STRING }
        },
    );

    // class methods
    Country.associate = (models) => {
        Country.hasMany(models.case);
    };



    return Country;
};
