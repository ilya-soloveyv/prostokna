'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product_image = sequelize.define('product_image', {
    iProductImageID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iProductID: { type: DataTypes.INTEGER, allowNull: false },
    sProductImageFrontName: DataTypes.STRING,
    sProductImageBackName: DataTypes.STRING,
    iOrder: DataTypes.INTEGER,
    iPhotoInDescOnPage: DataTypes.INTEGER,
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'product_image'
  });
  Product_image.associate = function(models) {
    Product_image.belongsTo(models.product, {
      foreignKey: 'iProductID'
    })
    Product_image.hasMany(models.product_image_point, {
      foreignKey: 'iProductImageID'
    })
  };
  return Product_image;
};