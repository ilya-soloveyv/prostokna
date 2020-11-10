const { Router } = require('express');
const Material = require('../../models').material;

const router = Router();

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
      title: material.sMaterialTitle
    }))
  };

  res.json(response);
});

module.exports = router;
