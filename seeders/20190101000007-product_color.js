'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('product_color', [
      {
        iProductColorID: 1,
        iProductID: 4,
        iColorID: 1,
        sProductColorFilename: '1.png',
      },
      {
        iProductColorID: 2,
        iProductID: 4,
        iColorID: 2,
        sProductColorFilename: '2.png',
      },
      {
        iProductColorID: 3,
        iProductID: 4,
        iColorID: 3,
        sProductColorFilename: '3.png',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_color', null, {});
  }
};
