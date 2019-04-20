'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('gallery_group', [
      {
        iGalleryGroupID: 1,
        sGalleryGroupTitle: "Квартиры",
        sGalleryGroupUri: "apartments",
      },
      {
        iGalleryGroupID: 2,
        sGalleryGroupTitle: "Загородный дом",
        sGalleryGroupUri: "home",
      },
      {
        iGalleryGroupID: 3,
        sGalleryGroupTitle: "Гараж",
        sGalleryGroupUri: "garage",
      },
      {
        iGalleryGroupID: 4,
        sGalleryGroupTitle: "Коммерческая недвижимость",
        sGalleryGroupUri: "commercial",
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('gallery_group', null, {});
  }
};
