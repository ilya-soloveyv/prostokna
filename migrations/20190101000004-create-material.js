'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('material', {
      iMaterialID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      sMaterialTitle: { type: Sequelize.STRING, allowNull: false  },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'material'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('material');
  }
};