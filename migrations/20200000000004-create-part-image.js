'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('part_image', {
      iPartImageID: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      iPartModelID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'part_model',
          key: 'iPartModelID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      iPartColorID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'part_color',
          key: 'iPartColorID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      sPartImageFile: {
        type: Sequelize.STRING,
        allowNull: false
      },
      iActive: { type: Sequelize.BOOLEAN, defaultValue: true }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'part_color'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('part_color');
  }
};