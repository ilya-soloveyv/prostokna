'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_producttype', {
      iProductProductTypeID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
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
      iProductTypeID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'producttype',
          key: 'iProductTypeID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'product_producttype'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_producttype');
  }
};