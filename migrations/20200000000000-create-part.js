'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('part', {
      iPartID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      sPartTitle: { type: Sequelize.STRING, allowNull: false },
      iActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      iOrder: { type: Sequelize.INTEGER, defaultValue: 9999, allowNull: false }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'part'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('part');
  }
};