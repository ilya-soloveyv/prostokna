'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('part_image', [
      {
        iPartImageID: 1,
        iPartModelID: 3,
        iPartColorID: 1,
        sPartImageFile: '1.jpg',
        iActive: true
      },
      {
        iPartImageID: 2,
        iPartModelID: 3,
        iPartColorID: 3,
        sPartImageFile: '2.jpg',
        iActive: true
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('part_image', null, {});
  }
};
