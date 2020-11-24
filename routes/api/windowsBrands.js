const { Router } = require('express');
const Brand = require('../../models').brand;
const Product = require('../../models').product;

const router = Router();

// const getBrandsByMaterial = async iMaterialID => {
//   const handledBrands = [];
//   const brandsByMaterial = [];
//   const productsByMaterial = await Product.findAll({
//     attributes: ['iBrandID'],
//     where: {
//       iMaterialID: iMaterialID
//     },
//     include: [
//       {
//         model: Brand,
//         attributes: ['sBrandTitle', 'sBrandDesc']
//         // where: {
//         //   iActive: 1
//         // }
//       }
//     ]
//   });

//   productsByMaterial.forEach(product => {
//     const id = product.iBrandID;
//     const title = product.brand.sBrandTitle;
//     const description = product.brand.sBrandDesc;

//     console.log(product.brand);

//     if (handledBrands.indexOf(id) !== -1) return;

//     handledBrands.push(id);

//     brandsByMaterial.push({
//       id,
//       title,
//       description
//     });
//   });

//   return brandsByMaterial;
// };

// router.get('/', async (req, res, next) => {
//   res.json({
//     status: 'OK',
//     payload: await getBrandsByMaterial(req.query.materialId)
//   });
// });

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

/**
 * Доступна фильтрация по id материала
 */
router.get('/', async (req, res, next) => {
  const materialId = req.query.materialId;

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
