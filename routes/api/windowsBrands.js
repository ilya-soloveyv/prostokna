const { Router } = require('express');
const Brand = require('../../models').brand;

const router = Router();

/**
 * Доступна фильтрация по id материала
 */
router.get('/', async (req, res, next) => {
  res.json({
    status: 'OK',
    payload: await Brand.getBrandsByMaterial(req.query.materialId)
  });
});

module.exports = router;
