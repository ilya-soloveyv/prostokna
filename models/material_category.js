'use strict';
module.exports = (sequelize, DataTypes) => {
  const Material_category = sequelize.define('material_category', {
    iMaterialCategoryID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iMaterialID: { type: DataTypes.INTEGER, allowNull: false },
    sMaterialCategoryTitle: { type: DataTypes.STRING, allowNull: false },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'material_category'
  });
  Material_category.associate = function(models) {

  };
  return Material_category;
};