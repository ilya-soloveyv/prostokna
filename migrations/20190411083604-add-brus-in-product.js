'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('product', 'iBrusID', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'brus',
        key: 'iBrusID',
      },
      onUpdate: 'NO ACTION',
      onDelete: 'CASCADE',
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('product', 'iBrusID')
  }
};
