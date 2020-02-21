'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('handle', {
      iHandleID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      iHandleBrandID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'handle_brand',
          key: 'iHandleBrandID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      sHandleTitle: { type: Sequelize.STRING, allowNull: false },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'handle'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('handle');
  }
};