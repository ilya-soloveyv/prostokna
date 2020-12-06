'use strict';
module.exports = (sequelize, DataTypes) => {
  const IntuitiveProduct = sequelize.define('intuitiveProduct', {
    iIntuitiveProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    iIntuitiveAnswerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    iProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'intuitive_product'
  });

  IntuitiveProduct.associate = function(models) {
    // IntuitiveAnswer.belongsTo(models.intuitiveQuestion, {
    //   foreignKey: 'iIntuitiveQuestionID'
    // })
  };

  IntuitiveProduct.list = async () => {
    const response = await IntuitiveProduct.findAll()
    return response
  }

  // IntuitiveAnswer.item = async (iIntuitiveAnswerID = false) => {
  //   const response = await IntuitiveAnswer.findByPk(iIntuitiveAnswerID)
  //   return response
  // }

  // IntuitiveAnswer.up = async ({ iIntuitiveAnswerID, iIntuitiveQuestionID, sIntuitiveAnswerTitle, iSort}) => {
  //   let response = null
  //   if (iIntuitiveAnswerID) {
  //     response = await IntuitiveAnswer.update(
  //       {
  //         iIntuitiveQuestionID,
  //         sIntuitiveAnswerTitle,
  //         iSort
  //       },
  //       {
  //         where: {
  //           iIntuitiveAnswerID
  //         }
  //       }
  //     )
  //   } else {
  //     response = await IntuitiveAnswer.create({
  //       iIntuitiveQuestionID,
  //       sIntuitiveAnswerTitle,
  //       iSort
  //     })
  //   }
  //   return response
  // }

  // IntuitiveAnswer.delete = async (iIntuitiveAnswerID = false) => {
  //   const response = await IntuitiveAnswer.destroy({
  //     where : {
  //       iIntuitiveAnswerID
  //     }
  //   })
  //   return response
  // }

  return IntuitiveProduct;
};