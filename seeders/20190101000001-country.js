'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('country', [
      {
        iCountryID: 1,
        sCountryTitle: "Россия",
      },
      {
        iCountryID: 2,
        sCountryTitle: "Белоруссия",
      },
      {
        iCountryID: 3,
        sCountryTitle: "Норвегия",
      },
      {
        iCountryID: 4,
        sCountryTitle: "Швейцария",
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('country', null, {});
  }
};
