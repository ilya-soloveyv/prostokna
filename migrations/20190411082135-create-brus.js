'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('brus', {
      iBrusID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      sBrusTitle: { type: Sequelize.STRING, allowNull: false },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'brus'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('brus');
  }
};