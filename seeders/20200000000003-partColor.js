'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('part_color', [
      {
        iPartColorID: 1,
        iPartBrandID: 3,
        sPartColorTitle: 'Синий',
        sPartColorCode: '0000ff',
        sPartColorTitleCode: 'Ярко синий',
        sPartColorFileName: null,
        iActive: true,
        iOrder: 1001
      },
      {
        iPartColorID: 2,
        iPartBrandID: 3,
        sPartColorTitle: 'Красный',
        sPartColorCode: 'ff0000',
        sPartColorTitleCode: 'Ярко красный',
        sPartColorFileName: null,
        iActive: true,
        iOrder: 1001
      },
      {
        iPartColorID: 3,
        iPartBrandID: 3,
        sPartColorTitle: 'Зеленый',
        sPartColorCode: '00ff00',
        sPartColorTitleCode: 'Ярко зеленый',
        sPartColorFileName: null,
        iActive: true,
        iOrder: 1001
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('part_color', null, {});
  }
};
