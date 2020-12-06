const fs = require('fs');
const { Router } = require('express');
const multer = require('multer');

const router = Router();
const upload = multer({ dest: 'temp/files' });

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
};

/**
 * Окна
 */

router.use('/windowsMaterials', require('./windowsMaterials'));
router.use('/windowsBrands', require('./windowsBrands'));
router.use('/windowsModels', require('./windowsModels'));
router.use('/windowsModelData', require('./windowsModelData'));
router.use('/windowsSill', require('./windowsBrands'));
router.use('/windowsColors', require('./windowsColors'));
router.use('/windowsRanges', require('./windowsRanges'));

/**
 * Балконные кострукции
 */
router.use('/balconyBrands', require('./balconyBrands'));
router.use('/balconyModels', require('./balconyModels'));
router.use('/balconyModelData', require('./balconyModelData'));
router.use('/balconyColors', require('./balconyColors'));
router.use('/balconyRanges', require('./balconyRanges'));

/**
 * Создаем дирректории нужные для заглушки ниже
 */
if (!fs.existsSync('temp')) {
  fs.mkdirSync('temp');
}
if (!fs.existsSync('temp/files')) {
  fs.mkdirSync('temp/files');
}

router.post(
  '/uploadCunfiguratorResult',
  upload.array('files'),
  (req, res, next) => {
    const requestId = Date.now();
    const recivedData = { files: req.files, ...req.body };

    recivedData.products = recivedData.products.map(products =>
      JSON.parse(products)
    );

    storeData(recivedData, `temp/${requestId}.json`);

    res.json({ status: 'OK', payload: { requestId } });
  }
);

module.exports = router;
