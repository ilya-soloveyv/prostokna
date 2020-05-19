'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('intuitive_answer', {
      iIntuitiveAnswerID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      sIntuitiveAnswerTitle: { type: Sequelize.STRING, allowNull: false },
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