'use strict';
module.exports = (sequelize, DataTypes) => {
  const GalleryImage = sequelize.define('gallery_image', {
    iGalleryImageID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iGalleryID: { allowNull: false, type: DataTypes.INTEGER },
    sGalleryImageName: { type: DataTypes.STRING, allowNull: false },
    iGalleryImageOrder: { allowNull: false, type: DataTypes.INTEGER },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'gallery_image'
  });
  GalleryImage.associate = function(models) {

  };
  return GalleryImage;
};