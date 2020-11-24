'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('intuitive_answer', [
      {
        iIntuitiveAnswerID: 1,
        iIntuitiveQuestionID: 1,
        sIntuitiveAnswerTitle: 'ПВХ',
        iSort: 1,
      },
      {
        iIntuitiveAnswerID: 2,
        iIntuitiveQuestionID: 1,
        sIntuitiveAnswerTitle: 'Алюминий',
        iSort: 2,
      },
      {
        iIntuitiveAnswerID: 3,
        iIntuitiveQuestionID: 1,
        sIntuitiveAnswerTitle: 'Дерево',
        iSort: 3,
      },
      {
        iIntuitiveAnswerID: 4,
        iIntuitiveQuestionID: 2,
        sIntuitiveAnswerTitle: 'Панельный',
        iSort: 1,
      },
      {
        iIntuitiveAnswerID: 5,
        iIntuitiveQuestionID: 2,
        sIntuitiveAnswerTitle: 'Кирпичный',
        iSort: 1,
      },
      {
        iIntuitiveAnswerID: 6,
        iIntuitiveQuestionID: 2,
        sIntuitiveAnswerTitle: 'Монолитный',
        iSort: 1,
      },
      {
        iIntuitiveAnswerID: 7,
        iIntuitiveQuestionID: 2,
        sIntuitiveAnswerTitle: 'Не знаю',
        iSort: 1,
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('intuitive_answer', null, {});
  }
};
