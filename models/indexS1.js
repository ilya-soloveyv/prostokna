'use strict';
module.exports = (sequelize, DataTypes) => {
  const IndexS1 = sequelize.define('index_s1', {
    s1ID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    s1Title: { type: DataTypes.STRING },
    s1Desc: { type: DataTypes.STRING }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'index_s1'
  });
  return IndexS1;
};