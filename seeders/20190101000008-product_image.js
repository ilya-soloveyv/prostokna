'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('product_image', [
      {
        iProductImageID: 1,
        iProductID: 4,
        sProductImageFrontName: '1.png',
        sProductImageBackName: '11.svg',
        iOrder: 99,
        iPhotoInDescOnPage: false,
      },
      {
        iProductImageID: 2,
        iProductID: 4,
        sProductImageFrontName: '2.png',
        sProductImageBackName: '22.svg',
        iOrder: 99,
        iPhotoInDescOnPage: true,
      },
      {
        iProductImageID: 3,
        iProductID: 4,
        sProductImageFrontName: '3.png',
        sProductImageBackName: '33.svg',
        iOrder: 99,
        iPhotoInDescOnPage: false,
      },
      {
        iProductImageID: 4,
        iProductID: 4,
        sProductImageFrontName: '4.png',
        sProductImageBackName: null,
        iOrder: 99,
        iPhotoInDescOnPage: false,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_image', null, {});
  }
};
