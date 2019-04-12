'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('brus', [
      {
        iBrusID: 1,
        sBrusTitle: 'Цельноламельный',
      },
      {
        iBrusID: 2,
        sBrusTitle: 'Сращеный',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('brus', null, {});
  }
};
