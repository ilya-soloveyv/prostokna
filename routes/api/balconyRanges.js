const { Router } = require('express');
const router = Router();
const s = require('../../src/utils/safeOpeningsSequence');

const balconyRanges = { x: [450, 1600], y: [500, 2000] };

/**
 * Допустимые диапозоны значений не зависящии от прочих параметров балконной кострукции
 */
router.get('/', async (req, res, next) => {
  res.json(
    {
      status: 'OK',
      payload: {
        // Допустимые диапозоны размеров по типу балконной конструкции
        balcony: {
          twoPanes: balconyRanges,
          threePanes: balconyRanges,
          fourPanes: balconyRanges,
          cornerLeft: balconyRanges,
          cornerRight: balconyRanges,
          twoCorners: balconyRanges,
          angleLeft: balconyRanges,
          angleRight: balconyRanges
        },
        windowSill: { x: [450, 2000], y: [10, 500] } // длинна и грубина подоконника
      }
    },
    null,
    2
  );
});

module.exports = router;
