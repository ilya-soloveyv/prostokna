'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('product_color', 'iIndex', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('product_color', 'iIndex')
  }
};
