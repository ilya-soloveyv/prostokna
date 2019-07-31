'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    iProductID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iMaterialID: { type: DataTypes.INTEGER, allowNull: false },
    iMaterialCategoryID: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
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
    iBrusID: DataTypes.INTEGER,
    iGenerateUriMaterial: DataTypes.INTEGER,
    iGenerateUriBrus: DataTypes.INTEGER,
    iPrice: { type: DataTypes.INTEGER, allowNull: true },
    iActive:{ type: DataTypes.INTEGER, allowNull: true },
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
    Product.belongsTo(models.material_category, {
      foreignKey: 'iMaterialCategoryID'
    })
    Product.hasMany(models.product_color, {
      foreignKey: 'iProductID'
    })
    Product.hasMany(models.product_image, {
      foreignKey: 'iProductID'
    })
    Product.belongsTo(models.brus, {
      foreignKey: 'iBrusID'
    })
    Product.hasMany(models.product_link, {
      foreignKey: 'iProductIDFrom'
    })
    Product.hasMany(models.product_producttype, {
      foreignKey: 'iProductID'
    })
  };

  Product.getProduct = async function (iProductID) {
    if (!Number.isInteger(iProductID)) {
      var product = await Product.findAll({
        attributes: ['iProductID'],
        where: {
          sProductURI: iProductID
        }
      })
      if (product[0] && product[0].iProductID) {
        iProductID = product[0].iProductID
      } else {
        return {}
      }      
    }

    var product = await Product.findByPk(iProductID, {
      include: [
        {
          model: sequelize.models.brand
        },
        {
          model: sequelize.models.material
        },
        {
          model: sequelize.models.brus
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
        },
        {
          model: sequelize.models.product_link,
          required: false,
          where: {
            iProductIDFrom: iProductID
          },
          include: [
            {
              model: sequelize.models.product,
              required: false,
              attributes: ['iMaterialID', 'iBrusID', 'sProductTitle', 'sProductURI', 'iGenerateUriMaterial', 'iGenerateUriBrus'],
              include: [
                {
                  model: sequelize.models.brand,
                  attributes: ['sBrandTitle'],
                },
                {
                  model: sequelize.models.material,
                  attributes: ['sMaterialTitle'],
                },
                {
                  model: sequelize.models.brus,
                  attributes: ['sBrusTitle'],
                }                
              ]
            },
          ]
        },
        {
          model: sequelize.models.product_producttype
        }
      ],
      order: [
        ['iProductID', 'ASC'],
        [sequelize.models.product_image, 'iOrder', 'ASC']
      ]
    })

    product.dataValues.product_producttype = []
    if ("product_producttypes" in product && product.product_producttypes.length) {
      product.product_producttypes.forEach((type) => {
        product.dataValues.product_producttype.push(type.iProductTypeID)
      })
    }

    if ("product_links" in product && product.product_links.length) {
      var iMaterialID = product.iMaterialID
      var iBrusID = product.iBrusID
      var temp = {
        material: [],
        brus: []
      }
      product.product_links.forEach(element => {
        if (element.product.iMaterialID != iMaterialID) {
          temp.material.push({
            iProductID: element.iProductIDLink,
            sProductURI: element.product.sProductURI,
            iMaterialID: element.product.iMaterialID,
            sMaterialTitle: element.product.material.sMaterialTitle
          })
        }
        if (element.product.iBrusID != iBrusID) {
          temp.brus.push({
            iProductID: element.iProductIDLink,
            sProductURI: element.product.sProductURI,
            iBrusID: element.product.iBrusID,
            sBrusTitle: element.product.bru.sBrusTitle
          })
        }
      })

      if (temp.material.length) {
        temp.material.push({
          iProductID: product.iProductID,
          sProductURI: product.sProductURI,
          iMaterialID: product.iMaterialID,
          sMaterialTitle: product.material.sMaterialTitle
        })
        function compareMaterial(a, b) {
          return a.iMaterialID - b.iMaterialID
        }
        temp.material.sort(compareMaterial)
      }

      if (temp.brus.length) {
        temp.brus.push({
          iProductID: product.iProductID,
          sProductURI: product.sProductURI,
          iBrusID: product.iBrusID,
          sBrusTitle: product.bru.sBrusTitle
        })
        function compareBrus(a, b) {
          return a.iBrusID - b.iBrusID
        }
        temp.brus.sort(compareBrus)
      }

      product.product_links = temp
    }
    



    return product
  }

  return Product;
};