'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('intuitive_question', [
      {
        iIntuitiveQuestionID: 1,
        iIntuitiveTypeID: 1,
        sIntuitiveQuestionTitle: 'Материал для окон',
        iSort: 1,
      },
      {
        iIntuitiveQuestionID: 2,
        iIntuitiveTypeID: 1,
        sIntuitiveQuestionTitle: 'Тип дома',
        iSort: 2,
      },
      {
        iIntuitiveQuestionID: 3,
        iIntuitiveTypeID: 1,
        sIntuitiveQuestionTitle: 'Средняя температура зимой',
        iSort: 3,
      },
      {
        iIntuitiveQuestionID: 4,
        iIntuitiveTypeID: 2,
        sIntuitiveQuestionTitle: 'Материал для окон',
        iSort: 1,
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('intuitive_question', null, {});
  }
};
