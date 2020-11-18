const { Router } = require('express');
const router = Router();
const s = require('../../src/utils/safeOpeningsSequence');

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
  res.json({
    status: 'OK',
    payload: {
      name: 'Brandname MODEL',
      prices: {
        window: {
          '0': priceTable,
          '1': priceTable,
          '2': priceTable,
          [s('10')]: priceTable,
          [s('20')]: priceTable,
          [s('11')]: priceTable,
          [s('12')]: priceTable,
          [s('22')]: priceTable,
          [s('100')]: priceTable,
          [s('200')]: priceTable,
          [s('101')]: priceTable,
          [s('201')]: priceTable,
          [s('202')]: priceTable,
          [s('111')]: priceTable,
          [s('121')]: priceTable,
          [s('212')]: priceTable,
          [s('222')]: priceTable
        },
        door: {
          1: priceTable,
          2: priceTable
        }
      },
      profiles: [
        { id: 1, title: 'Трехкамерный' },
        { id: 2, title: 'Пятикамерный' }
      ],
      glazings: [
        { id: 1, title: 'Однокамерный стеклопакет' },
        { id: 2, title: 'Двухкамерный стеклопакет' }
      ],
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
        aliquam atque corrupti id ratione. Ullam necessitatibus provident
        possimus, vel iusto fugit repellat consequatur reiciendis cumque
        vitae, doloribus aliquid quis sapiente?`,
      charts: {
        safety: randomPercent(),
        aesthetics: randomPercent(),
        ecology: randomPercent(),
        insulation: randomPercent(),
        durability: 100
      }
    }
  });
});

module.exports = router;
