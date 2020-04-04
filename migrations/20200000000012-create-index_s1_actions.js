'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('index_s1_action', {
      s1ActionID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      s1ActionTitle: { type: Sequelize.STRING },
      s1ActionURL: { type: Sequelize.STRING },
      s1ActionImage: { type: Sequelize.STRING },
      iActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      iOrder: { type: Sequelize.INTEGER, defaultValue: 9999 }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'index_s1_action'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('index_s1_action');
  }
};