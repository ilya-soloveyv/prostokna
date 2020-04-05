'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('part_brand', 'sPartBrandURI', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'empty'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('part_brand', 'sPartBrandURI')
  }
};
