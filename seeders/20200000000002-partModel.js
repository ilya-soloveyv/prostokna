'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('part_model', [
      {
        iPartModelID: 1,
        iPartBrandID: 3,
        sPartModelTitle: 'Первая модель',
        iPartModelPrice: 2500,
        tPartModelDesc: 'Пурум',
        iActive: true,
        iOrder: 1001
      },
      {
        iPartModelID: 2,
        iPartBrandID: 3,
        sPartModelTitle: 'Вторая модель',
        iPartModelPrice: 3500,
        tPartModelDesc: null,
        iActive: true,
        iOrder: 1003
      },
      {
        iPartModelID: 3,
        iPartBrandID: 3,
        sPartModelTitle: 'Третья модель',
        iPartModelPrice: 5500,
        tPartModelDesc: null,
        iActive: false,
        iOrder: 1002
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('part_model', null, {});
  }
};
