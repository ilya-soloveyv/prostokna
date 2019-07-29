'use strict';
module.exports = (sequelize, DataTypes) => {
  const Producttype = sequelize.define('producttype', {
    iProductTypeID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sProductTypeTitle: { type: DataTypes.STRING, allowNull: false },
    sProductTypeIco: { type: DataTypes.STRING, allowNull: false },
    iProductTypeOrder: { type: DataTypes.STRING, allowNull: false, defaultValue: 9999 },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'producttype'
  });
  Producttype.associate = function(models) {

  };
  return Producttype;
};