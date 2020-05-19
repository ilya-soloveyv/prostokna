'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('intuitive_question', 'iIntuitiveAnswerID', {
      type: Sequelize.INTEGER,
      defaultValue: null,
      references: {
        model: 'intuitive_answer',
        key: 'iIntuitiveAnswerID',
      },
      onUpdate: 'NO ACTION',
      onDelete: 'CASCADE',
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('intuitive_question', 'iIntuitiveAnswerID')
  }
};
