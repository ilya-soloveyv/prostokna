'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('part_color', {
      iPartColorID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
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
      sPartColorTitle: { type: Sequelize.STRING, allowNull: false },
      sPartColorCode: { type: Sequelize.STRING },
      sPartColorTitleCode: { type: Sequelize.STRING, allowNull: false },
      sPartColorFileName: { type: Sequelize.STRING },
      iActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      iOrder: { type: Sequelize.INTEGER, defaultValue: 9999, allowNull: false }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'part_color'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('part_color');
  }
};