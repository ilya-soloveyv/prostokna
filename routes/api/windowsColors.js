const { Router } = require('express');

const router = Router();

const colors = [
  /**
   * Цвет по умолчанию должен выводится первым в списке
   *
   * `id`: number — id цвета
   * `title`: string — назвение цвета
   * `hex`: string — шестнадцатеричный код цвета
   * `darkText`: boolean – текст поверх цвета будет темным
   * `texture`: string – png текстура материала
   */
  { id: 0, title: 'Default', hex: '#ffffff', darkText: true },
  { id: 1, title: 'Flame', hex: '#f2552c' },
  { id: 2, title: 'Greenery', hex: '#92B558' },
  { id: 3, title: 'Marina', hex: '#4F84C4' },
  {
    id: 4,
    title: 'Primrose Yellow',
    hex: '#f6d155',
    texture: '/images/configurator/wood-texture.png'
  },
  { id: 5, title: 'Shaded Spruce', hex: '#005960' },
  { id: 6, title: 'Navy Peony', hex: '#223a5e' }
];

/**
 * Доступна фильтрация по id материала
 */
router.get('/', async (req, res, next) => {
  const materialId = req.query.materialId;

  res.json({
    status: 'OK',
    payload: {
      frontFace: colors, // лицевая сторона
      backFace: colors, // обратная сторона
      seal: colors // уплотнитель
    }
  });
});

module.exports = router;
