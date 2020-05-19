'use strict';
module.exports = (sequelize, DataTypes) => {
  const IntuitiveQuestion = sequelize.define('intuitiveQuestion', {
    iIntuitiveQuestionID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sIntuitiveQuestionTitle: { type: DataTypes.STRING },
    iIntuitiveAnswerID: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'intuitive_question'
  });
  IntuitiveQuestion.associate = function(models) {
    IntuitiveQuestion.hasMany(models.intuitiveAnswer, {
      foreignKey: 'iIntuitiveAnswerID'
    })
  };

  IntuitiveQuestion.list = async () => {
    const response = await IntuitiveQuestion.findAll({
      raw: true
    })
    return response
  }

  IntuitiveQuestion.structureList = async () => {
    const IntuitiveAnswer = sequelize.models.intuitiveAnswer

    const questions = await IntuitiveQuestion.list()
    const answers = await IntuitiveAnswer.list()

    const response = IntuitiveQuestion.getQuestions({ answers, questions })

    return response
  }

  IntuitiveQuestion.getQuestions = ({ iIntuitiveAnswerID = null, answers = [], questions = [] }) => {
    const response = questions.find((question) => question.iIntuitiveAnswerID === iIntuitiveAnswerID)
    if (response !== undefined) {
      response.answers = IntuitiveQuestion.getAnswers({
        iIntuitiveQuestionID: response.iIntuitiveQuestionID,
        answers,
        questions      
      })
    }
    return response
  }

  IntuitiveQuestion.getAnswers = ({ iIntuitiveQuestionID = false, answers = [], questions = [] }) => {
    const response = answers.filter((answer) => answer.iIntuitiveQuestionID === iIntuitiveQuestionID)
    response.forEach(answer => {
      answer.question = IntuitiveQuestion.getQuestions({
        iIntuitiveAnswerID: answer.iIntuitiveAnswerID,
        answers,
        questions
      })
    })
    return response
  }


  return IntuitiveQuestion;
};