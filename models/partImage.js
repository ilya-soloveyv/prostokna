'use strict';
module.exports = (sequelize, DataTypes) => {
  const PartImage = sequelize.define('partImage', {
    iPartImageID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iPartModelID: { type: DataTypes.INTEGER, allowNull: false },
    iPartColorID: { type: DataTypes.INTEGER, allowNull: false },
    sPartImageFile: { type: DataTypes.STRING, allowNull: false },
    iActive: { type: DataTypes.BOOLEAN, defaultValue: true }
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
      foreignKey: 'iPartColorID'
    })
  };

  return PartImage;
};