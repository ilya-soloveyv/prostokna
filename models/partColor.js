'use strict';
module.exports = (sequelize, DataTypes) => {
  const PartModel = sequelize.define('partColor', {
    iPartColorID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iPartBrandID: { type: DataTypes.INTEGER, allowNull: false },
    sPartColorTitle: { type: DataTypes.STRING, allowNull: false },
    sPartColorCode: { type: DataTypes.STRING },
    sPartColorTitleCode: { type: DataTypes.STRING, allowNull: false },
    sPartColorFileName: { type: DataTypes.STRING },
    iActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    iOrder: { type: DataTypes.INTEGER, defaultValue: 9999, allowNull: false }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'part_color'
  });
  PartModel.associate = function(models) {
    PartModel.belongsTo(models.partBrand, {
      foreignKey: 'iPartBrandID'
    })
  };

  return PartModel;
};