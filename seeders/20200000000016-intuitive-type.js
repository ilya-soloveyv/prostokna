'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('intuitive_type', [
      {
        iIntuitiveTypeID: 1,
        sIntuitiveTypeTitle: 'Квартира'
      },
      {
        iIntuitiveTypeID: 2,
        sIntuitiveTypeTitle: 'Загородный дом'
      },
      {
        iIntuitiveTypeID: 3,
        sIntuitiveTypeTitle: 'Нежилое помещение'
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('intuitive_type', null, {});
  }
};
