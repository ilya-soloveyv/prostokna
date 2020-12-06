'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('intuitive_type', {
      iIntuitiveTypeID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      sIntuitiveTypeTitle: {
        type: Sequelize.STRING
      },
      tIntuitiveTypeSVGIco: {
        type: Sequelize.TEXT
      },
      iSort: {
        type: Sequelize.INTEGER,
        defaultValue: 9999
      }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'intuitive_type'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('intuitive_type');
  }
};