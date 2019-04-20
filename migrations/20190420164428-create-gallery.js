'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('gallery', {
      iGalleryID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      iGalleryGroupID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'gallery_group',
          key: 'iGalleryGroupID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      sGalleryTitle: { type: Sequelize.STRING, allowNull: false },
      sGalleryTitleMin: { type: Sequelize.STRING, allowNull: false },
      tGalleryText: { type: Sequelize.TEXT },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'gallery'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('gallery');
  }
};