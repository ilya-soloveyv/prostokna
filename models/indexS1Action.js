'use strict';
module.exports = (sequelize, DataTypes) => {
  const IndexS1Action = sequelize.define('index_s1_action', {
    s1ActionID: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    s1ActionTitle: { type: DataTypes.STRING },
    s1ActionURL: { type: DataTypes.STRING },
    s1ActionImage: { type: DataTypes.STRING },
    s1ActionImageMobile: { type: DataTypes.STRING },
    iActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    iOrder: { type: DataTypes.INTEGER, defaultValue: 9999 }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'index_s1_action'
  });
  return IndexS1Action;
};