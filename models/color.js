'use strict';
module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define('color', {
    iColorID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iMaterialID: { type: DataTypes.INTEGER, allowNull: false },
    sColorCode: DataTypes.STRING,
    sColorTitle: { type: DataTypes.STRING, allowNull: false },
    sColorTitleCode: { type: DataTypes.STRING, allowNull: false },
    sColorTextureFileName: DataTypes.STRING,
    iOrder: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'color'
  });
  Color.associate = function(models) {
    Color.belongsTo(models.material, {
      foreignKey: 'iMaterialID'
    })
  };
  return Color;
};