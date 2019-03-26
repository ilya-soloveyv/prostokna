'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('product', [
      {
        iProductID: 3,
        iMaterialID: 1,
        iBrandID: 2,
        sProductTitle: '58',
        sProductURI: 'kbe_58',
      },
      {
        iProductID: 4,
        iMaterialID: 1,
        iBrandID: 2,
        sProductTitle: '76',
        sProductURI: 'kbe_76',
        sProductDesc: 'Отменнное качество по приемлемой цене. Эстетичный профиль с закругленным штапиком'
      },
      {
        iProductID: 5,
        iMaterialID: 1,
        iBrandID: 2,
        sProductTitle: 'Expert',
        sProductURI: 'kbe_expert',
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product', null, {});
  }
};
