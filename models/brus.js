'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brus = sequelize.define('brus', {
    iBrusID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sBrusTitle: { type: DataTypes.STRING, allowNull: false },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'brus'
  });
  Brus.associate = function(models) {

  };
  return Brus;
};