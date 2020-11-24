'use strict';
module.exports = (sequelize, DataTypes) => {
  const IntuitiveAnswer = sequelize.define('intuitiveAnswer', {
    iIntuitiveAnswerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    iIntuitiveQuestionID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sIntuitiveAnswerTitle: {
      type: DataTypes.STRING
    },
    iSort: {
      type: DataTypes.INTEGER,
      defaultValue: 9999
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'intuitive_answer'
  });

  IntuitiveAnswer.associate = function(models) {
    // IntuitiveAnswer.belongsTo(models.intuitiveQuestion, {
    //   foreignKey: 'iIntuitiveQuestionID'
    // })
  };

  IntuitiveAnswer.list = async () => {
    const response = await IntuitiveAnswer.findAll({
      order: [
        ['iSort', 'ASC']
      ]
    })
    return response
  }

  IntuitiveAnswer.item = async (iIntuitiveAnswerID = false) => {
    const response = await IntuitiveAnswer.findByPk(iIntuitiveAnswerID)
    return response
  }

  IntuitiveAnswer.up = async ({ iIntuitiveAnswerID, iIntuitiveQuestionID, sIntuitiveAnswerTitle, iSort}) => {
    let response = null
    if (iIntuitiveAnswerID) {
      response = await IntuitiveAnswer.update(
        {
          iIntuitiveQuestionID,
          sIntuitiveAnswerTitle,
          iSort
        },
        {
          where: {
            iIntuitiveAnswerID
          }
        }
      )
    } else {
      response = await IntuitiveAnswer.create({
        iIntuitiveQuestionID,
        sIntuitiveAnswerTitle,
        iSort
      })
    }
    return response
  }

  IntuitiveAnswer.delete = async (iIntuitiveAnswerID = false) => {
    const response = await IntuitiveAnswer.destroy({
      where : {
        iIntuitiveAnswerID
      }
    })
    return response
  }

  return IntuitiveAnswer;
};