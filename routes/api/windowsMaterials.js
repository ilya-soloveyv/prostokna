const { Router } = require('express');
const Material = require('../../models').material;

const router = Router();

/**
 * Вывод материалов доступных для оконных кострукций
 */
router.get('/', async (req, res, next) => {
  const materials = await Material.findAll({
    attributes: ['iMaterialID', 'sMaterialTitle'],
    // where: {
    //   iActive: 1
    // },
    order: [['iMaterialID', 'ASC']]
  });

  const response = {
    status: 'OK',
    payload: materials.map(material => ({
      id: material.iMaterialID,
      title: material.sMaterialTitle,
      price: 2000,
      paintingCoefficient: {
        oneSide: 1.5,
        twoSides: 1.6,
        nonstandardAddition: 0.05
      },
      slopesPrice: {
        default: 0.942,
        colored: 5
      },
      slopesCornerPrice: {
        default: 0.43,
        colored: 2.4
      }
    }))
  };

  res.json(response);
});

module.exports = router;
