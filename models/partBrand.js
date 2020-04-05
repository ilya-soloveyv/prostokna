'use strict';
module.exports = (sequelize, DataTypes) => {
  const PartBrand = sequelize.define('partBrand', {
    iPartBrandID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iPartID: { type: DataTypes.INTEGER, allowNull: false },
    sPartBrandTitle: { type: DataTypes.STRING, allowNull: false },
    sPartBrandURI: { type: DataTypes.STRING, allowNull: false },
    iActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    iOrder: { type: DataTypes.INTEGER, defaultValue: 9999, allowNull: false }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'part_brand'
  });
  PartBrand.associate = function(models) {
    PartBrand.belongsTo(models.part, {
      foreignKey: 'iPartID'
    })
    PartBrand.hasMany(models.partModel, {
      foreignKey: 'iPartBrandID'
    })
  };

  PartBrand.getItem = async function(sPartBrandURI = false) {
    const partBrand = await PartBrand.findOne(
      {
        where: {
          sPartBrandURI,
          iActive: true
        },
        include: [
          {
            model: sequelize.models.partModel
          }
        ],
        order: [
          [sequelize.models.partModel, 'iOrder', 'ASC']
        ]
      }
    )
    return partBrand
  }

  return PartBrand;
};