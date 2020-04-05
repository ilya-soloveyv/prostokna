'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('part_image', [
      {
        iPartImageID: 1,
        iPartModelID: 3,
        iPartColorID: null,
        sPartImageFile: '1.jpg',
        iActive: true
      },
      {
        iPartImageID: 2,
        iPartModelID: 3,
        iPartColorID: null,
        sPartImageFile: '2.jpg',
        iActive: true
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('part_image', null, {});
  }
};
