const { Router } = require('express');

const router = Router();

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

module.exports = router;
