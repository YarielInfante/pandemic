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
                confirmed: Sequelize.DATE,
                casesPer1M: Sequelize.DATE,
                recovered: Sequelize.DATE,
                death: Sequelize.DATE,
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
    }
};
