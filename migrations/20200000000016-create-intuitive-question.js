'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('intuitive_question', {
      iIntuitiveQuestionID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      sIntuitiveQuestionTitle: { type: Sequelize.STRING, allowNull: false }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'intuitive_question'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('intuitive_question');
  }
};