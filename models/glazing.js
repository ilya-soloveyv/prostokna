'use strict';
module.exports = (sequelize, DataTypes) => {
  const Glazing = sequelize.define('glazing', {
    iGlazingID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sGlazingTitle: { type: DataTypes.STRING, allowNull: false }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'glazing'
  });
  Glazing.associate = function(models) {
    // associations can be defined here
  };
  return Glazing;
};