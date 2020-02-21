'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('product', 'HeatTransferResistance', {
      type: Sequelize.STRING
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('product', 'HeatTransferResistance', {
      type: Sequelize.STRING
    })
  }
};
