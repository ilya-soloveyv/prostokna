
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('material_category', {
      iMaterialCategoryID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
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
      sMaterialCategoryTitle: { type: Sequelize.STRING, allowNull: false },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('material_category');
  }
};