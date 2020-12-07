'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('brand', {
    iBrandID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sBrandTitle: { type: DataTypes.STRING, allowNull: false },
    iCountryID: { type: DataTypes.INTEGER, allowNull: false },
    sBrandURI: { type: DataTypes.STRING, allowNull: false },
    iActive: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
    sBrandDesc: { type: DataTypes.STRING, allowNull: true },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'brand'
  });
  
  Brand.associate = function(models) {
    Brand.belongsTo(models.country, {
      foreignKey: 'iCountryID'
    })
    Brand.hasMany(models.product, {
      foreignKey: 'iBrandID'
    })
  };

  Brand.getBrandsByMaterial = async function(iMaterialID = false) {
    // Готовим базовую фильтрацию
    const WHERE_product = {
      iActive: true
    }
    // Добавляем в фильтрации iMaterialID
    if (iMaterialID) {
      WHERE_product.iMaterialID = iMaterialID
    }

    const brands = await Brand.findAll({
      attributes: [
        ['iBrandID', 'id'],
        ['sBrandTitle', 'title'],
        ['sBrandDesc', 'description']
      ],
      where: {
        iActive: true
      },
      order: [
        ['sBrandTitle', 'ASC']
      ],
      include: [
        {
          attributes: [],
          model: sequelize.models.product,
          where: WHERE_product
        }
      ]
    });

    return brands
  }

  return Brand;
};