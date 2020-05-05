'use strict';
module.exports = (sequelize, DataTypes) => {
  const GalleryIndex = sequelize.define('gallery_index', {
    iGalleryIndexID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iProductID: { type: DataTypes.INTEGER },
    sGalleryIndexTitle: { type: DataTypes.STRING },
    tGalleryIndexText: { type: DataTypes.TEXT },
    sGalleryIndexImage: { type: DataTypes.STRING },
    iActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    iOrder: { type: DataTypes.INTEGER, defaultValue: 9999, allowNull: false }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'gallery_index'
  });
  GalleryIndex.associate = function(models) {
    GalleryIndex.belongsTo(models.product, {
      foreignKey: 'iProductID'
    })
  };
  GalleryIndex.list = async function ({ iActive } = {}) {
    const where = {}
    if (iActive !== undefined) {
      where.iActive = true
    }
    const gallery = await GalleryIndex.findAll({
      include: [
        {
          model: sequelize.models.product,
          include: [
            {
              model: sequelize.models.product_image
            },
            {
              model: sequelize.models.brand
            },
            {
              model: sequelize.models.material_category
            },
            {
              model: sequelize.models.brus
            }
          ] 
        }
      ],
      order: [
        [ 'iActive', 'DESC' ],
        [ 'iOrder', 'ASC' ],
        [ sequelize.models.product, sequelize.models.product_image, 'iOrder', 'ASC' ]
      ],
      where
    })
    return gallery
  }

  return GalleryIndex;
};