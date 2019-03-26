'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_image_point', {
      iProductImagePointID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
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
      iProductImageID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'product_image',
          key: 'iProductImageID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      fProductImagePointPosX: { type: Sequelize.INTEGER },
      fProductImagePointPosY: { type: Sequelize.INTEGER },
      tProductImagePointMess: { type: Sequelize.TEXT },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'product_image_point'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_image_point');
  }
};