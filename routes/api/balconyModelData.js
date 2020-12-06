const { Router } = require('express');
const router = Router();

const randomPercent = () => Math.round(Math.random() * 50) + 50;

const priceTable = {
  '1': [
    [450, 500, 1293],
    [450, 2000, 3318],
    [1025, 1250, 3743],
    [1600, 2000, 15767],
    [1600, 500, 2887]
  ],
  '2': [
    [450, 500, 1293],
    [450, 2000, 3318],
    [1025, 1250, 3743],
    [1600, 2000, 15767],
    [1600, 500, 2887]
  ]
};

router.get('/', async (req, res, next) => {
  const modelId = req.query.modelId;

  res.json({
    status: 'OK',
    payload: {
      name: 'Brandname MODEL',
      prices: {
        twoPanes: priceTable,
        threePanes: priceTable,
        fourPanes: priceTable,
        cornerLeft: priceTable,
        cornerRight: priceTable,
        twoCorners: priceTable,
        angleLeft: priceTable,
        angleRight: priceTable
      },
      glazings: [
        { id: 1, title: '3мм' },
        { id: 2, title: '5мм' }
      ],
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
        aliquam atque corrupti id ratione. Ullam necessitatibus provident
        possimus, vel iusto fugit repellat consequatur reiciendis cumque
        vitae, doloribus aliquid quis sapiente?`,
      charts: {
        price: {
          value: 8500,
          max: 10000
        },
        safety: randomPercent(),
        aesthetics: randomPercent(),
        ecology: randomPercent(),
        insulation: randomPercent(),
        durability: 100
      },

      paintingCoefficient: {
        oneSide: 1.5,
        twoSides: 1.6,
        nonstandardAddition: 0.05
      },

      installationPrice: 1500
    }
  });
});

module.exports = router;
