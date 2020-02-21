'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('handle', [
      {
        iHandleID: 1,
        iHandleBrandID: 1,
        sHandleTitle: 'Первая ручка'
      },
      {
        iHandleID: 2,
        iHandleBrandID: 2,
        sHandleTitle: 'Вторая ручка'
      },
      {
        iHandleID: 3,
        iHandleBrandID: 2,
        sHandleTitle: 'Третья ручка'
      },
      {
        iHandleID: 4,
        iHandleBrandID: 1,
        sHandleTitle: 'Четвертая ручка'
      },
      {
        iHandleID: 5,
        iHandleBrandID: 1,
        sHandleTitle: 'Пятая ручка'
      },
      {
        iHandleID: 6,
        iHandleBrandID: 1,
        sHandleTitle: 'Шестая ручка'
      },
      {
        iHandleID: 7,
        iHandleBrandID: 1,
        sHandleTitle: 'Седьмая ручка'
      },
      {
        iHandleID: 8,
        iHandleBrandID: 3,
        sHandleTitle: 'Восьмая ручка'
      },
      {
        iHandleID: 9,
        iHandleBrandID: 1,
        sHandleTitle: 'Девятая ручка'
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('handle', null, {});
  }
};
