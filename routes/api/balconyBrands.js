const { Router } = require('express');
const router = Router();

const brandDescription = `
<p>Отменнное качество по приемлемой цене. Эстетичный профиль с закругленным штапиком.</p>
<ul>
  <li>Монтажная глубина 60 мм;</li>
  <li>Трехкамерный профиль;</li>
  <li>Сопротивление теплопередаче 0,58 м2×°С/Вт;</li>
  <li>Класс профиля «В»;</li>
  <li>Звукоизоляция класса «С»;</li>
  <li>Защита от холода, осадков и ветра группы «С»;</li>
  <li>Фурнитура Roto (Германия)</li>
</ul>
`;

router.get('/', async (req, res, next) => {
  res.json({
    status: 'OK',
    payload: [
      { id: 1, title: 'Montblanc', description: brandDescription },
      { id: 2, title: 'Rehau', description: brandDescription },
      { id: 3, title: 'Wintech', description: brandDescription },
      { id: 4, title: 'Novotex', description: brandDescription },
      { id: 5, title: 'Proplex', description: brandDescription }
    ]
  });
});

module.exports = router;
