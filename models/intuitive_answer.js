'use strict';
module.exports = (sequelize, DataTypes) => {
  const IntuitiveAnswer = sequelize.define('intuitiveAnswer', {
    iIntuitiveAnswerID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sIntuitiveAnswerTitle: { type: DataTypes.STRING, allowNull: false },
    iIntuitiveQuestionID: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'intuitive_answer'
  });
  IntuitiveAnswer.associate = function(models) {
    IntuitiveAnswer.belongsTo(models.intuitiveQuestion, {
      foreignKey: 'iIntuitiveQuestionID'
    })
  };

  IntuitiveAnswer.list = async () => {
    const response = await IntuitiveAnswer.findAll({
      raw: true
    })
    return response
  }

  return IntuitiveAnswer;
};