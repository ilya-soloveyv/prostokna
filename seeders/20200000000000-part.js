'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('part', [
      {
        iPartID: 1,
        sPartTitle: 'Ручки',
        iActive: true,
        iOrder: 1003
      },
      {
        iPartID: 2,
        sPartTitle: 'Шторы',
        iActive: true,
        iOrder: 1001
      },
      {
        iPartID: 3,
        sPartTitle: 'Жалюзи',
        iActive: true,
        iOrder: 1002
      },
      {
        iPartID: 4,
        sPartTitle: 'Сетки',
        iActive: true,
        iOrder: 1004
      },
      {
        iPartID: 5,
        sPartTitle: 'Подоконники',
        iActive: false,
        iOrder: 1005
      },
      {
        iPartID: 6,
        sPartTitle: 'Клапаны',
        iActive: true,
        iOrder: 1007
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('part', null, {});
  }
};
