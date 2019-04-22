'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('gallery', 'iOrder', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 9999,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('gallery', 'iOrder')
  }
};
