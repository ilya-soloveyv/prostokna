const { Router } = require('express');

const router = Router();

router.get('/', async (req, res, next) => {
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
