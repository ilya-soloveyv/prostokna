'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    iProductID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iMaterialID: { type: DataTypes.INTEGER, allowNull: false },
    iBrandID: { type: DataTypes.INTEGER, allowNull: false },
    sProductTitle: { type: DataTypes.STRING, allowNull: false },
    sProductURI: { type: DataTypes.STRING, allowNull: false },
    iProductParam1: DataTypes.INTEGER,
    iProductParam2: DataTypes.INTEGER,
    iProductParam3: DataTypes.INTEGER,
    iProductParam4: DataTypes.INTEGER,
    iProductParam5: DataTypes.INTEGER,
    iProductParam6: DataTypes.INTEGER,
    sProductDesc: DataTypes.TEXT,
    sProductText: DataTypes.TEXT,
    MountingDepth: DataTypes.INTEGER,
    Profile: DataTypes.STRING,
    ProfileClass: DataTypes.STRING,
    DoubleGlazing: DataTypes.INTEGER,
    HeatTransferResistance: DataTypes.STRING,
    ShapikShapeOptions: DataTypes.STRING,
    DecorationOptions: DataTypes.STRING,
    FrameFeature: DataTypes.STRING,
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'product'
  });
  Product.associate = function(models) {
    Product.belongsTo(models.brand, {
      foreignKey: 'iBrandID'
    })
    Product.belongsTo(models.material, {
      foreignKey: 'iMaterialID'
    })
    Product.hasMany(models.product_color, {
      foreignKey: 'iProductID'
    })
    Product.hasMany(models.product_image, {
      foreignKey: 'iProductID'
    })
  };

  Product.getProduct = async function (iProductID) {
    return await Product.findByPk(iProductID, {
      include: [
        {
          model: sequelize.models.brand
        },
        {
          model: sequelize.models.material
        },
        {
          model: sequelize.models.product_image,
          include: [
            {
              model: sequelize.models.product_image_point
            }
          ]
        },
        {
          model: sequelize.models.product_color,
          include: [
            {
              model: sequelize.models.color
            }
          ]
        }
      ]
    })
  }

  return Product;
};