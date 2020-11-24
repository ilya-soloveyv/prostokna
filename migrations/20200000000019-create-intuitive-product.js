'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('intuitive_product', {
      iIntuitiveProductID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      iIntuitiveAnswerID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'intuitive_answer',
          key: 'iIntuitiveAnswerID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
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
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'intuitive_product'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('intuitive_product');
  }
};