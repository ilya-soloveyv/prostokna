'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('brand', {
      iBrandID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      sBrandTitle: { type: Sequelize.STRING, allowNull: false },
      iCountryID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'country',
          key: 'iCountryID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'brand'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('brand');
  }
};