'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('product', 'iActive', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('product', 'iActive')
  }
};
