'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('material', [
      {
        iMaterialID: 1,
        sMaterialTitle: 'Пластик',
      },
      {
        iMaterialID: 2,
        sMaterialTitle: 'Дерево евробрус',
      },
      {
        iMaterialID: 3,
        sMaterialTitle: 'Алюминий',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('material', null, {});
  }
};
