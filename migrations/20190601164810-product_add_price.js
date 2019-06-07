'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('product', 'iPrice', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('product', 'iPrice')
  }
};
