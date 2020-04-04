'use strict';
module.exports = (sequelize, DataTypes) => {
  const PartModel = sequelize.define('partModel', {
    iPartModelID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iPartBrandID: { type: DataTypes.INTEGER, allowNull: false },
    sPartModelTitle: { type: DataTypes.STRING, allowNull: false },
    sPartModelURI: { type: DataTypes.STRING, allowNull: false },
    iPartModelPrice: { type: DataTypes.INTEGER },
    tPartModelDesc: { type: DataTypes.TEXT },
    iActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    iOrder: { type: DataTypes.INTEGER, defaultValue: 9999, allowNull: false },
    sPartModelFile: { type: DataTypes.STRING }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'part_model'
  });
  PartModel.associate = function(models) {
    PartModel.belongsTo(models.partBrand, {
      foreignKey: 'iPartBrandID',
      as: 'brand'
    })
    PartModel.hasMany(models.partImage, {
      foreignKey: 'iPartModelID',
      as: 'images'
    })
  };

  PartModel.get = async function (iPartModelID) {
    const partModel = await PartModel.findByPk(iPartModelID, {
      include: [
        {
          model: sequelize.models.partImage,
          as: 'images',
          include: [
            {
              model: sequelize.models.partColor,
              as: 'color'
            }
          ]
        },
        {
          model: sequelize.models.partBrand,
          as: 'brand'
        }
      ],
      order: [
        [ 'images', 'color', 'iOrder', 'ASC' ]
      ]
    })
    return partModel
  }

  return PartModel;
};