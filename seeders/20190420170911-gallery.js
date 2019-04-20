'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('gallery', [
      {
        iGalleryID: 1,
        iGalleryGroupID: 1,
        sGalleryTitle: "Девелоперская группа ПИК",
        sGalleryTitleMin: "ПИК",
        tGalleryText: "",
      },
      {
        iGalleryID: 2,
        iGalleryGroupID: 1,
        sGalleryTitle: "Компания шмоток Nike",
        sGalleryTitleMin: "Nike",
        tGalleryText: "",
      },
      {
        iGalleryID: 3,
        iGalleryGroupID: 2,
        sGalleryTitle: "Автомобильный гигант TESLA",
        sGalleryTitleMin: "TESLA",
        tGalleryText: "",
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('gallery', null, {});
  }
};
