'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('brand', 'sBrandDesc', {
      type: Sequelize.TEXT,
      allowNull: true
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('brand', 'sBrandDesc')
  }
};
