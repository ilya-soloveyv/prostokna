'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('brand', 'iActive', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('brand', 'iActive')
  }
};
