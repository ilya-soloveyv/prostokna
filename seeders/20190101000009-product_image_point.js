'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('product_image_point', [
      {
        iProductImagePointID: 1,
        iProductID: 4,
        iProductImageID: 1,
        fProductImagePointPosX: 88,
        fProductImagePointPosY: 6,
        tProductImagePointMess: "Петельки Ахонь!",
      },
      {
        iProductImagePointID: 2,
        iProductID: 4,
        iProductImageID: 1,
        fProductImagePointPosX: 2,
        fProductImagePointPosY: 46,
        tProductImagePointMess: "The DOM node used as reference of the tooltip (it can be a jQuery element)",
      },
      {
        iProductImagePointID: 3,
        iProductID: 4,
        iProductImageID: 2,
        fProductImagePointPosX: 47,
        fProductImagePointPosY: 48,
        tProductImagePointMess: "Стекло от бога!",
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_image_point', null, {});
  }
};
