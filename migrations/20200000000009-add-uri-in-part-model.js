'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('part_model', 'sPartModelURI', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'empty'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('part_model', 'sPartModelURI')
  }
};
