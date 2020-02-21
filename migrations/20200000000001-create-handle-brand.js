'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('handle_brand', {
      iHandleBrandID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      sHandleBrandTitle: { type: Sequelize.STRING, allowNull: false },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'handle_brand'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('handle_brand');
  }
};