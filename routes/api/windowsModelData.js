const { Router } = require('express');
const router = Router();
const s = require('../../src/utils/safeOpeningsSequence');

const randomPercent = () => Math.round(Math.random() * 50) + 50;

const priceTable = {
  // однокамерный стеклопакет
  '1': [
    [450, 500, 1027],
    [450, 2000, 2648],
    [1025, 1250, 3057],
    [1600, 500, 2310],
    [1600, 500, 2310]
  ],
  // двухкамерный стеклопакет
  '2': [
    [450, 500, 1144],
    [450, 2000, 3018],
    [1025, 1250, 3653],
    [1600, 500, 2644],
    [1600, 2000, 10109]
  ]
};

/**
 * Вывод доподнительной информации о модели
 * Переменная строки запроса `modelId` обязательна
 */
router.get('/', async (req, res, next) => {
  const modelId = req.query.modelId;

  res.json({
    status: 'OK',
    payload: {
      name: 'Brandname MODEL', // бренд + модель
      prices: {
        window: {
          // подробнее о кодах конфигурации окна в `windowsRanges.js`
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
      // Профили опциональны. Например их не будет у деревянных окон
      profiles: [
        { id: 1, title: 'Трехкамерный' },
        { id: 2, title: 'Пятикамерный' }
      ],
      glazings: [
        { id: 1, title: 'Однокамерный стеклопакет' },
        { id: 2, title: 'Двухкамерный стеклопакет' }
      ],
      // Описание модели. Допустима базовая HTML разметка
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
        aliquam atque corrupti id ratione. Ullam necessitatibus provident
        possimus, vel iusto fugit repellat consequatur reiciendis cumque
        vitae, doloribus aliquid quis sapiente?`,
      // Характеристики модели выражаемые в процентах
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
      }
    }
  });
});

module.exports = router;
