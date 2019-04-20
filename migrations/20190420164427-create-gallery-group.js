'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('gallery_group', {
      iGalleryGroupID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      sGalleryGroupTitle: { type: Sequelize.STRING, allowNull: false },
      sGalleryGroupUri: { type: Sequelize.STRING, allowNull: false },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'gallery_group'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('gallery_group');
  }
};