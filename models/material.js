'use strict';
module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define('material', {
    iMaterialID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sMaterialTitle: { type: DataTypes.STRING, allowNull: false },
    iActive: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'material'
  });
  Material.associate = function(models) {
    Material.hasMany(models.color, {
      foreignKey: 'iMaterialID'
    })
    Material.hasMany(models.product, {
      foreignKey: 'iMaterialID'
    })
    Material.hasMany(models.material_category, {
      foreignKey: 'iMaterialID'
    })
  };
  return Material;
};