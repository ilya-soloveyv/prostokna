const { Router } = require('express');
const router = Router();

/**
 * Модели оконных кострукций
 *
 * Фильтруются по бренду и материалу
 */
router.get('/', async (req, res, next) => {
  const brandId = req.query.brandId;
  const materialId = req.query.materialId;

  res.json({
    status: 'OK',
    payload: [
      { id: 1, title: 'NEO' },
      { id: 2, title: 'ECO' },
      { id: 3, title: 'ULTRA' },
      { id: 4, title: 'ERA' }
    ]
  });
});

module.exports = router;
