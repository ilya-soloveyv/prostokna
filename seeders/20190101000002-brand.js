'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('brand', [
      {
        iBrandID: 1,
        sBrandTitle: 'Alutech',
        iCountryID: 2,
      },
      {
        iBrandID: 2,
        sBrandTitle: 'KBE',
        iCountryID: 4,
      },
      {
        iBrandID: 3,
        sBrandTitle: 'Montblanc',
        iCountryID: 3,
      },
      {
        iBrandID: 4,
        sBrandTitle: 'Novotex',
        iCountryID: 4,
      },
      {
        iBrandID: 5,
        sBrandTitle: 'Rehau',
        iCountryID: 3,
      },
      {
        iBrandID: 6,
        sBrandTitle: 'SEAL',
        iCountryID: 4,
      },
      {
        iBrandID: 7,
        sBrandTitle: 'Wintech',
        iCountryID: 3,
      },
      {
        iBrandID: 8,
        sBrandTitle: 'Сосна',
        iCountryID: 1,
      },
      {
        iBrandID: 9,
        sBrandTitle: 'Лиственница',
        iCountryID: 1,
      },
      {
        iBrandID: 10,
        sBrandTitle: 'Дуб',
        iCountryID: 1,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('brand', null, {});
  }
};
