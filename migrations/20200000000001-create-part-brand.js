'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('part_brand', {
      iPartBrandID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      iPartID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'part',
          key: 'iPartID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      sPartBrandTitle: { type: Sequelize.STRING, allowNull: false },
      iActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      iOrder: { type: Sequelize.INTEGER, defaultValue: 9999, allowNull: false }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'part_brand'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('part_brand');
  }
};