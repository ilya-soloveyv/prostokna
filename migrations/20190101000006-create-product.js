'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product', {
      iProductID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
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
      iBrandID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'brand',
          key: 'iBrandID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      sProductTitle: { type: Sequelize.STRING, allowNull: false },
      sProductURI: { type: Sequelize.STRING, allowNull: false },
      iProductParam1: { type: Sequelize.INTEGER },
      iProductParam2: { type: Sequelize.INTEGER },
      iProductParam3: { type: Sequelize.INTEGER },
      iProductParam4: { type: Sequelize.INTEGER },
      iProductParam5: { type: Sequelize.INTEGER },
      iProductParam6: { type: Sequelize.INTEGER },
      sProductDesc: { type: Sequelize.TEXT },
      sProductText: { type: Sequelize.TEXT },
      MountingDepth: { type: Sequelize.INTEGER },
      Profile: { type: Sequelize.STRING },
      ProfileClass: { type: Sequelize.STRING },
      DoubleGlazing: { type: Sequelize.INTEGER },
      HeatTransferResistance: { type: Sequelize.INTEGER },
      ShapikShapeOptions: { type: Sequelize.STRING },
      DecorationOptions: { type: Sequelize.STRING },
      FrameFeature: { type: Sequelize.STRING },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'product'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product')
  }
};