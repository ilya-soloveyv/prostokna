'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('gallery_image', [
      {
        iGalleryImageID: 1,
        iGalleryID: 1,
        sGalleryImageName: "test.jpg",
      },
      {
        iGalleryImageID: 2,
        iGalleryID: 1,
        sGalleryImageName: "test.jpg",
      },
      {
        iGalleryImageID: 3,
        iGalleryID: 1,
        sGalleryImageName: "test.jpg",
      },
      {
        iGalleryImageID: 4,
        iGalleryID: 2,
        sGalleryImageName: "test.jpg",
      },
      {
        iGalleryImageID: 5,
        iGalleryID: 3,
        sGalleryImageName: "test.jpg",
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('gallery_image', null, {});
  }
};
