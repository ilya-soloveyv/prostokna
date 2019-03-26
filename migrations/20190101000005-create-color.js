'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('color', {
      iColorID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
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
      sColorCode: { type: Sequelize.STRING },
      sColorTitle: { type: Sequelize.STRING, allowNull: false },
      sColorTitleCode: { type: Sequelize.STRING, allowNull: false },
      sColorTextureFileName: { type: Sequelize.STRING },
      iOrder: { type: Sequelize.INTEGER, defaultValue: 9999, allowNull: false },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'color'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('color');
  }
};