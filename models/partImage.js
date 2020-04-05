'use strict';
module.exports = (sequelize, DataTypes) => {
  const PartImage = sequelize.define('partImage', {
    iPartImageID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iPartModelID: { type: DataTypes.INTEGER, allowNull: false },
    iPartColorID: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    sPartImageFile: { type: DataTypes.STRING, allowNull: false },
    iActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    iPartColorPrice: { type: DataTypes.INTEGER }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'part_image'
  });
  PartImage.associate = function(models) {
    PartImage.belongsTo(models.partModel, {
      foreignKey: 'iPartModelID'
    })
    PartImage.belongsTo(models.partColor, {
      foreignKey: 'iPartColorID',
      as: 'color'
    })
  };

  PartImage.getList = async (iPartModelID) => {
    const images = await PartImage.findAll({
      where: {
        iPartModelID
      }
    })
    return images
  }

  return PartImage;
};