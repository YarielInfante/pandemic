'use strict';

module.exports = function (sequelize, DataTypes) {
    const country = sequelize.define('country',
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            name: {type: DataTypes.STRING}
        },
        {
            tableName: 'country'
        }
    );

    // class methods
    country.associate = (models) => {
        country.hasMany(models.case);
    };


    return country;
};
