'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_color', {
      iProductColorID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
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
      iColorID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'color',
          key: 'iColorID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      sProductColorFilename: { allowNull: false, type: Sequelize.STRING }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'product_color'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_color');
  }
};