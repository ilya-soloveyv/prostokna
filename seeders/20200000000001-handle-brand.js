'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('handle_brand', [
      {
        iHandleBrandID: 1,
        sHandleBrandTitle: 'Первый бренд'
      },
      {
        iHandleBrandID: 2,
        sHandleBrandTitle: 'Второй бренд'
      },
      {
        iHandleBrandID: 3,
        sHandleBrandTitle: 'Третий бренд'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('handle_brand', null, {});
  }
};
