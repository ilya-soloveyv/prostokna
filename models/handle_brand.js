'use strict';
module.exports = (sequelize, DataTypes) => {
  const HandleBrand = sequelize.define('handle_brand', {
    iHandleBrandID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sHandleBrandTitle: { type: DataTypes.STRING, allowNull: false }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'handle_brand'
  });
  HandleBrand.associate = function(models) {
    HandleBrand.hasMany(models.handle, {
      foreignKey: 'iHandleBrandID'
    })
  };
  return HandleBrand;
};