'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('country', {
      iCountryID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      sCountryTitle: { type: Sequelize.STRING, allowNull: false },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('country');
  }
};