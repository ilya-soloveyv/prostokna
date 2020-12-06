'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('intuitive_product', [
      {
        iIntuitiveProductID: 1,
        iIntuitiveAnswerID: 1,
        iProductID: 3,
      },
      {
        iIntuitiveProductID: 2,
        iIntuitiveAnswerID: 2,
        iProductID: 4,
      },
      {
        iIntuitiveProductID: 3,
        iIntuitiveAnswerID: 1,
        iProductID: 5,
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('intuitive_product', null, {});
  }
};
