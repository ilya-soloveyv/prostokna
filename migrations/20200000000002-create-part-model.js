'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('part_model', {
      iPartModelID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      iPartBrandID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'part_brand',
          key: 'iPartBrandID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      sPartModelTitle: { type: Sequelize.STRING, allowNull: false },
      iPartModelPrice: { type: Sequelize.INTEGER },
      tPartModelDesc: { type: Sequelize.TEXT },
      iActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      iOrder: { type: Sequelize.INTEGER, defaultValue: 9999, allowNull: false }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'part_model'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('part_model');
  }
};