'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_link', {
      iProductLinkID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      iProductIDFrom: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'product',
          key: 'iProductID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      iProductIDTo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'product',
          key: 'iProductID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      iMaterialID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'material',
          key: 'iMaterialID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      iBrusID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'brus',
          key: 'iBrusID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'product_link'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_link');
  }
};