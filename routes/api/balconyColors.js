const { Router } = require('express');

const router = Router();

const colors = [
  { id: 0, title: 'Default', hex: '#ffffff', default: true, darkText: true },
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

router.get('/', async (req, res, next) => {
  res.json({
    status: 'OK',
    payload: {
      frontFace: colors,
      backFace: colors,
      seal: colors
    }
  });
});

module.exports = router;
