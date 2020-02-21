'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('brand', [
      {
        iBrandID: 1,
        sBrandTitle: 'Alutech',
        iCountryID: 2,
        sBrandURI: 'alutech'
      },
      {
        iBrandID: 2,
        sBrandTitle: 'KBE',
        iCountryID: 4,
        sBrandURI: 'kbe'
      },
      {
        iBrandID: 3,
        sBrandTitle: 'Montblanc',
        iCountryID: 3,
        sBrandURI: 'montblanc'
      },
      {
        iBrandID: 4,
        sBrandTitle: 'Novotex',
        iCountryID: 4,
        sBrandURI: 'novotex'
      },
      {
        iBrandID: 5,
        sBrandTitle: 'Rehau',
        iCountryID: 3,
        sBrandURI: 'rehau'
      },
      {
        iBrandID: 6,
        sBrandTitle: 'SEAL',
        iCountryID: 4,
        sBrandURI: 'seal'
      },
      {
        iBrandID: 7,
        sBrandTitle: 'Wintech',
        iCountryID: 3,
        sBrandURI: 'wintech'
      },
      {
        iBrandID: 8,
        sBrandTitle: 'Сосна',
        iCountryID: 1,
        sBrandURI: 'sosna'
      },
      {
        iBrandID: 9,
        sBrandTitle: 'Лиственница',
        iCountryID: 1,
        sBrandURI: 'list'
      },
      {
        iBrandID: 10,
        sBrandTitle: 'Дуб',
        iCountryID: 1,
        sBrandURI: 'dub'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('brand', null, {});
  }
};
