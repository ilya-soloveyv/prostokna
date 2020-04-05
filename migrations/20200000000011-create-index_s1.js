'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('index_s1', {
      s1ID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      s1Title: { type: Sequelize.STRING },
      s1Desc: { type: Sequelize.STRING }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'index_s1'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('index_s1');
  }
};