'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gallery = sequelize.define('gallery', {
    iGalleryID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iGalleryGroupID: { allowNull: false, type: DataTypes.INTEGER },
    sGalleryTitle: { type: DataTypes.STRING, allowNull: false },
    sGalleryTitleMin: { type: DataTypes.STRING, allowNull: false },
    tGalleryText: { type: DataTypes.TEXT, allowNull: true },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'gallery'
  });
  Gallery.associate = function(models) {
    Gallery.belongsTo(models.gallery_group, {
      foreignKey: 'iGalleryGroupID'
    })
    Gallery.hasMany(models.gallery_image, {
        foreignKey: 'iGalleryID'
    })
  };
  return Gallery;
};