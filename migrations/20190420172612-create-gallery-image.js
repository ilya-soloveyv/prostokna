'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('gallery_image', {
      iGalleryImageID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      iGalleryID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'gallery',
          key: 'iGalleryID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      sGalleryImageName: { type: Sequelize.STRING, allowNull: false },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'gallery_image'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('gallery_image');
  }
};