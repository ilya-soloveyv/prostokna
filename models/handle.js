'use strict';
module.exports = (sequelize, DataTypes) => {
  const Handle = sequelize.define('handle', {
    iHandleID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iHandleBrandID: { type: DataTypes.INTEGER, allowNull: false },
    sHandleTitle: { type: DataTypes.STRING, allowNull: false }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'handle'
  });
  Handle.associate = function(models) {
    Handle.belongsTo(models.handle_brand, {
      foreignKey: 'iHandleBrandID'
    })
  };

  return Handle;
};