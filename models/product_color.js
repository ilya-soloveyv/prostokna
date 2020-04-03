'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product_color = sequelize.define('product_color', {
    iProductColorID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iProductID: { allowNull: false, type: DataTypes.INTEGER },
    iColorID: { allowNull: false, type: DataTypes.INTEGER },
    sProductColorFilename: { allowNull: false, type: DataTypes.STRING },
    iIndex: { allowNull: true, type: DataTypes.INTEGER },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'product_color'
  });
  Product_color.associate = function(models) {
    Product_color.belongsTo(models.product, {
      foreignKey: 'iProductID'
    })
    Product_color.belongsTo(models.color, {
      foreignKey: 'iColorID'
    })
  };
  return Product_color;
};