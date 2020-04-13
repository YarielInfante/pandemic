'use strict';

module.exports = function (sequelize, DataTypes) {
    const Case = sequelize.define('case',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true },
            confirmed: { type: DataTypes.INTEGER},
            casesPer1M: { type: DataTypes.INTEGER},
            recovered: { type: DataTypes.INTEGER},
            death: { type: DataTypes.INTEGER},

        },
    );

    // class methods
    Case.associate = (models) => {
        Case.belongsTo(models.country);
    };

    return Case;
};
