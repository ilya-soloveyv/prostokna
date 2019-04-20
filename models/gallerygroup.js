'use strict';
module.exports = (sequelize, DataTypes) => {
  const GalleryGroup = sequelize.define('gallery_group', {
    iGalleryGroupID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sGalleryGroupTitle: { type: DataTypes.STRING, allowNull: false },
    sGalleryGroupUri: { type: DataTypes.STRING, allowNull: false },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'gallery_group'
  });
  GalleryGroup.associate = function(models) {
    // Country.hasMany(models.brand, {
    //   foreignKey: 'iCountryID'
    // })
  };
  return GalleryGroup;
};