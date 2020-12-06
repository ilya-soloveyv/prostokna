const { Router } = require('express');
const router = Router();

router.get('/', async (req, res, next) => {
  const brandId = req.query.brandId;
  const materialId = req.query.materialId;

  res.json({
    status: 'OK',
    payload: [{ id: 1, title: 'UNO' }]
  });
});

module.exports = router;
