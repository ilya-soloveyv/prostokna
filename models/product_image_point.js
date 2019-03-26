'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product_image_point = sequelize.define('product_image_point', {
    iProductImagePointID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iProductID: { type: DataTypes.INTEGER, allowNull: false },
    iProductImageID: { type: DataTypes.INTEGER, allowNull: false },
    fProductImagePointPosX: DataTypes.INTEGER,
    fProductImagePointPosY: DataTypes.INTEGER,
    tProductImagePointMess: DataTypes.TEXT,
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'product_image_point'
  });
  Product_image_point.associate = function(models) {
    Product_image_point.belongsTo(models.product, {
      foreignKey: 'iProductID'
    })
    Product_image_point.belongsTo(models.product_image, {
      foreignKey: 'iProductImageID'
    })
  };
  return Product_image_point;
};