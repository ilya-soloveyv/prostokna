'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('intuitive_question', {
      iIntuitiveQuestionID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      iIntuitiveTypeID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'intuitive_type',
          key: 'iIntuitiveTypeID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      sIntuitiveQuestionTitle: {
        type: Sequelize.STRING
      },
      iSort: {
        type: Sequelize.INTEGER,
        defaultValue: 9999
      }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'intuitive_question'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('intuitive_question');
  }
};