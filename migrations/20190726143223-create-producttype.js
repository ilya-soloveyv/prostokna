'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('producttype', {
      iProductTypeID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      sProductTypeTitle: { type: Sequelize.STRING, allowNull: false },
      sProductTypeIco: { type: Sequelize.STRING, allowNull: false },
      iProductTypeOrder: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 9999 },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('producttype');
  }
};