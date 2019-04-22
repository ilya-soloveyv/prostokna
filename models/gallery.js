'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gallery = sequelize.define('gallery', {
    iGalleryID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iGalleryGroupID: { allowNull: false, type: DataTypes.INTEGER },
    sGalleryTitle: { type: DataTypes.STRING, allowNull: false },
    sGalleryTitleMin: { type: DataTypes.STRING, allowNull: false },
    tGalleryText: { type: DataTypes.TEXT, allowNull: true },
    iOrder: { allowNull: false, type: DataTypes.INTEGER },
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

  Gallery.getList = async function (req = []) {
    var where_gallery = {}
    if (req.iGalleryID) {
      where_gallery = {
        iGalleryID: req.iGalleryID
      }
    }
    var where_gallery_group = {}
    if (req.sGalleryGroupUri) {
      where_gallery_group = {
        sGalleryGroupUri: req.sGalleryGroupUri
      }
    }
    return await Gallery.findAll({
      where_gallery,
      include: [
        {
          model: sequelize.models.gallery_group,
          where: where_gallery_group
        },
        {
          model: sequelize.models.gallery_image,
        }
      ],
      order: [
        ['iOrder', 'ASC'],
        ['iGalleryID', 'ASC'],
        [sequelize.models.gallery_image, 'iGalleryImageOrder', 'ASC'],
      ]
    })
  }

  return Gallery;
};