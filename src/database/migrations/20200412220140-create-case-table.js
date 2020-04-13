'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('case',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                countryId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'country',
                        key: 'id'
                    },
                    onUpdate: 'cascade',
                    onDelete: 'cascade'
                },
                location: Sequelize.STRING,
                confirmed: Sequelize.DECIMAL,
                casesPer1M: Sequelize.DECIMAL,
                recovered: Sequelize.DECIMAL,
                death: Sequelize.DECIMAL,
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('case');
    }
};
