'use strict';
module.exports = (sequelize, DataTypes) => {
  const HandleBrand = sequelize.define('part', {
    iPartID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sPartTitle: { type: DataTypes.STRING, allowNull: false },
    iActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    iOrder: { type: DataTypes.INTEGER, defaultValue: 9999, allowNull: false }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'part'
  });
  return HandleBrand;
};