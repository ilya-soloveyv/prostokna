'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('glazing', {
      iGlazingID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      sGlazingTitle: { type: Sequelize.STRING, allowNull: false  },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'glazing'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('glazing');
  }
};