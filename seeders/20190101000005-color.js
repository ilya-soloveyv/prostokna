'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('color', [
      {
        iColorID: 1,
        iMaterialID: 3,
        sColorCode: 'AF8A54',
        sColorTitle: 'Коричнево-бежевый',
        sColorTitleCode: 'ral1011',
        sColorTextureFileName: null
      },
      {
        iColorID: 2,
        iMaterialID: 3,
        sColorCode: 'A4957D',
        sColorTitle: 'Серо-бежевый',
        sColorTitleCode: 'ral1019',
        sColorTextureFileName: null
      },
      {
        iColorID: 3,
        iMaterialID: 3,
        sColorCode: 'F0CA00',
        sColorTitle: 'Транспортно-жёлтый',
        sColorTitleCode: 'ral1023',
        sColorTextureFileName: null
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('color', null, {});
  }
};
