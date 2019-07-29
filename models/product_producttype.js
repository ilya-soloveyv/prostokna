'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_producttype = sequelize.define('product_producttype', {
    iProductProductTypeID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iProductID: { type: DataTypes.INTEGER, allowNull: false },
    iProductTypeID: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'product_producttype'
  });
  product_producttype.associate = function(models) {
    // associations can be defined here
  };
  return product_producttype;
};