'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('intuitive_answer', {
      iIntuitiveAnswerID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      iIntuitiveQuestionID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'intuitive_question',
          key: 'iIntuitiveQuestionID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      sIntuitiveAnswerTitle: {
        type: Sequelize.STRING
      },
      iSort: {
        type: Sequelize.INTEGER,
        defaultValue: 9999
      }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'intuitive_answer'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('intuitive_answer');
  }
};