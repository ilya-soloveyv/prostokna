'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_image', {
      iProductImageID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      iProductID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'product',
          key: 'iProductID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      sProductImageFrontName: { type: Sequelize.STRING },
      sProductImageBackName: { type: Sequelize.STRING },
      iOrder: { type: Sequelize.INTEGER, defaultValue: 99 },
      iPhotoInDescOnPage: { type: Sequelize.BOOLEAN },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'product_image'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_image');
  }
};