'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('product_link', 'iBrusID')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('product_link', 'iBrusID', {
      type: Sequelize.INTEGER,
      allowNull: false
    })
  }
};
