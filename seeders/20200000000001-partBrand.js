'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('part_brand', [
      {
        iPartBrandID: 1,
        iPartID: 1,
        sPartBrandTitle: 'Первый бренд',
        iActive: true,
        iOrder: 1001
      },
      {
        iPartBrandID: 2,
        iPartID: 1,
        sPartBrandTitle: 'Второй бренд',
        iActive: false,
        iOrder: 1000
      },
      {
        iPartBrandID: 3,
        iPartID: 1,
        sPartBrandTitle: 'Третий бренд',
        iActive: true,
        iOrder: 1002
      },
      {
        iPartBrandID: 4,
        iPartID: 2,
        sPartBrandTitle: 'Четвертый бренд',
        iActive: true,
        iOrder: 1004
      },
      {
        iPartBrandID: 5,
        iPartID: 2,
        sPartBrandTitle: 'Пятый бренд',
        iActive: true,
        iOrder: 1003
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('part_brand', null, {});
  }
};
