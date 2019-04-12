'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product_link = sequelize.define('product_link', {
    iProductLinkID: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    iProductIDFrom: { allowNull: false, type: DataTypes.INTEGER },
    iProductIDTo: { allowNull: false, type: DataTypes.INTEGER },
    iMaterialID: { allowNull: false, type: DataTypes.INTEGER },
    iBrusID: { allowNull: false, type: DataTypes.INTEGER },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'product_link'
  });
  Product_link.associate = function(models) {
    Product_link.belongsTo(models.product, {
      foreignKey: 'iProductIDFrom'
    })
    Product_link.belongsTo(models.product, {
      foreignKey: 'iProductIDTo'
    })
    Product_link.belongsTo(models.material, {
      foreignKey: 'iMaterialID'
    })
    Product_link.belongsTo(models.brus, {
      foreignKey: 'iBrusID'
    })
  };
  return Product_link;
};