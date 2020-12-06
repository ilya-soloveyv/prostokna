'use strict';
module.exports = (sequelize, DataTypes) => {
  const IntuitiveType = sequelize.define('intuitiveType', {
    iIntuitiveTypeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    sIntuitiveTypeTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tIntuitiveTypeSVGIco: {
      type: DataTypes.TEXT
    },
    iSort: {
      type: DataTypes.INTEGER,
      defaultValue: 9999
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'intuitive_type'
  });

  IntuitiveType.associate = function(models) {
    // IntuitiveAnswer.belongsTo(models.intuitiveQuestion, {
    //   foreignKey: 'iIntuitiveQuestionID'
    // })
  };

  IntuitiveType.list = async () => {
    const response = await IntuitiveType.findAll({
      order: [
        ['iSort', 'ASC']
      ]
    })
    return response
  }

  IntuitiveType.item = async (iIntuitiveTypeID = false) => {
    const response = await IntuitiveType.findByPk(iIntuitiveTypeID)
    return response
  }

  IntuitiveType.up = async ({ iIntuitiveTypeID, sIntuitiveTypeTitle, tIntuitiveTypeSVGIco, iSort}) => {
    let response = null
    if (iIntuitiveTypeID) {
      response = await IntuitiveType.update(
        {
          sIntuitiveTypeTitle,
          tIntuitiveTypeSVGIco,
          iSort
        },
        {
          where: {
            iIntuitiveTypeID
          }
        }
      )
    } else {
      response = await IntuitiveType.create({
        sIntuitiveTypeTitle,
        tIntuitiveTypeSVGIco,
        iSort
      })
    }
    return response
  }

  IntuitiveType.delete = async (iIntuitiveTypeID = false) => {
    const response = await IntuitiveType.destroy({
      where : {
        iIntuitiveTypeID
      }
    })
    return response
  }

  return IntuitiveType;
};