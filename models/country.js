'use strict';
module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('country', {
    iCountryID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sCountryTitle: { type: DataTypes.STRING, allowNull: false },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'country'
  });
  Country.associate = function(models) {
    Country.hasMany(models.brand, {
      foreignKey: 'iCountryID'
    })
  };
  return Country;
};