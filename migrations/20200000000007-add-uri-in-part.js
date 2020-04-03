'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('part', 'sPartURI', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'empty'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('part', 'sPartURI')
  }
};
