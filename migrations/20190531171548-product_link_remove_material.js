'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('product_link', 'iMaterialID')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('product_link', 'iMaterialID', {
      type: Sequelize.INTEGER,
      allowNull: false
    })
  }
};
