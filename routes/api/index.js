const { Router } = require('express');

const router = Router();

/**
 * Окна
 */

/**
 * Материалы окон
 */
router.use('/windowsMaterials', require('./windowsMaterials'));

/**
 * Доступные бренды для окон
 * Возможна фильтрация по материалу
 * Возможна фильтрация по размерам
 * Возможна фиьльтрация по типу открытия створки
 */
router.use('/windowsBrands', require('./windowsBrands'));

/**
 * Доступные модели по материалу и бренду
 */
router.use('/windowsModels', require('./windowsModels'));

/**
 * Информация по модели
 * Доступная камерность профиля
 * Доступные стреклопакеты
 */
router.use('/windowsModelData', require('./windowsModelData'));

/**
 * Информация о подоконнике
 */
router.use('/windowsSill', require('./windowsBrands'));

/**
 * Доступные цвета
 */
router.use('/windowsColors', require('./windowsColors'));

/**
 * Диапозоны для слайдеров настроек окна, подоконника и откосов
 */
router.use('/windowsRanges', require('./windowsRanges'));

/**
 * Балконные кострукции
 */

module.exports = router;
