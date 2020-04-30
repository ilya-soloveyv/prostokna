'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('gallery_index', {
      iGalleryIndexID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      iProductID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'product',
          key: 'iProductID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      sGalleryIndexTitle: { type: Sequelize.STRING },
      tGalleryIndexText: { type: Sequelize.TEXT },
      sGalleryIndexImage: { type: Sequelize.STRING },
      iActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      iOrder: { type: Sequelize.INTEGER, defaultValue: 9999, allowNull: false }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'gallery_index'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('gallery_index');
  }
};