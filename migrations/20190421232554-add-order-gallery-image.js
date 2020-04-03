'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('gallery_image', 'iGalleryImageOrder', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 9999,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('gallery_image', 'iGalleryImageOrder')
  }
};
