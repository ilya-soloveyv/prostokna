'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('glazing', [
      {
        iGlazingID: 1,
        sGlazingTitle: "Однокамерный стеклопакет",
      },
      {
        iGlazingID: 2,
        sGlazingTitle: "Двухкамерный стеклопакет",
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('glazing', null, {});
  }
};
