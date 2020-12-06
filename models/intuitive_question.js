'use strict';
module.exports = (sequelize, DataTypes) => {
  const IntuitiveQuestion = sequelize.define('intuitiveQuestion', {
    iIntuitiveQuestionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    iIntuitiveTypeID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sIntuitiveQuestionTitle: {
      type: DataTypes.STRING
    },
    iSort: {
      type: DataTypes.INTEGER,
      defaultValue: 9999
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'intuitive_question'
  });

  IntuitiveQuestion.associate = function(models) {
    // IntuitiveAnswer.belongsTo(models.intuitiveQuestion, {
    //   foreignKey: 'iIntuitiveQuestionID'
    // })
  };

  IntuitiveQuestion.list = async () => {
    const response = await IntuitiveQuestion.findAll({
      order: [
        ['iSort', 'ASC']
      ]
    })
    return response
  }

  IntuitiveQuestion.item = async (iIntuitiveQuestionID = false) => {
    const response = await IntuitiveQuestion.findByPk(iIntuitiveQuestionID)
    return response
  }

  IntuitiveQuestion.up = async ({ iIntuitiveQuestionID, iIntuitiveTypeID, sIntuitiveQuestionTitle, iSort}) => {
    let response = null
    if (iIntuitiveQuestionID) {
      response = await IntuitiveQuestion.update(
        {
          iIntuitiveTypeID,
          sIntuitiveQuestionTitle,
          iSort
        },
        {
          where: {
            iIntuitiveQuestionID
          }
        }
      )
    } else {
      response = await IntuitiveQuestion.create({
        iIntuitiveTypeID,
        sIntuitiveQuestionTitle,
        iSort
      })
    }
    return response
  }

  IntuitiveQuestion.delete = async (iIntuitiveQuestionID = false) => {
    const response = await IntuitiveQuestion.destroy({
      where : {
        iIntuitiveQuestionID
      }
    })
    return response
  }

  return IntuitiveQuestion;
};