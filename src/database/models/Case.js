'use strict';

module.exports = function (sequelize, DataTypes) {
    const Case = sequelize.define('case',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            location: {type: DataTypes.STRING},
            confirmed: { type: DataTypes.DECIMAL},
            casesPer1M: { type: DataTypes.DECIMAL},
            recovered: { type: DataTypes.DECIMAL},
            death: { type: DataTypes.DECIMAL},

        },
        {
            tableName: 'case'
        }
    );

    // class methods
    Case.associate = (models) => {
        Case.belongsTo(models.country);
    };

    return Case;
};
