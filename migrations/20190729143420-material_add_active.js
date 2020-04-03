'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('material', 'iActive', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('material', 'iActive')
  }
};
