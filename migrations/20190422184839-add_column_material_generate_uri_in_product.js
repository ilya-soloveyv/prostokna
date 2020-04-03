'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('product', 'iGenerateUriMaterial', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('product', 'iGenerateUriMaterial')
  }
};
