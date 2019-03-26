'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('brand', {
    iBrandID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sBrandTitle: { type: DataTypes.STRING, allowNull: false },
    iCountryID: { type: DataTypes.INTEGER, allowNull: false }
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
  return Brand;
};