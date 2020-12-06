// свойства по умолчанию для всех продуктов
const coreDefaults = { selectedShapeId: null };

const Product = class {
  constructor() {
    this.id = Date.now();
    this.lastUpdate = Date.now();
    this.globalStateHook = null;

    const combinedDefaults = {
      ...coreDefaults,
      ...this.defaults
    };

    Object.keys(combinedDefaults).forEach(key => {
      this[key] = combinedDefaults[key];
    });

    return new Proxy(this, {
      set(target, property, value) {
        target[property] = value;
        target.triggerUpdate();
        return true;
      }
    });
  }

  get defaults() {
    return {};
  }

  get baseValues() {
    return this?.globalStateHook()?.configurator?.baseValues;
  }

  /**
   * Данный метод нужно реализовать в дочернем классе
   */
  calculatePrice() {
    throw new Error('Не реализована логика рассчета цены');
  }

  /**
   * Данный метод нужно реализовать в дочернем классе
   *
   * Данный метод вызывается для установки параметов, которые зависят от других параметров объекта
   */
  init(globalStore) {
    throw new Error('Не реализована логика инициализации продукта');
  }

  /**
   * Экспорт свойств продукта для их последующего сохранения или передачи
   */
  export() {
    const optionsToExport = {};
    const combinedDefaults = {
      ...coreDefaults,
      ...this.defaults
    };
    const exporters = this.exporters || {};

    Object.keys(combinedDefaults).forEach(key => {
      optionsToExport[key] = this[key];
    });

    Object.keys(exporters).forEach(key => {
      const exporter = exporters[key];
      optionsToExport[key] = exporter();
    });

    optionsToExport.constructorName = this.constructor.name;

    return optionsToExport;
  }

  getSelectedShape() {
    return this.getAvaibleShapes().find(
      shape => shape.value === this.selectedShapeId
    );
  }

  /**
   * Допустимые формфакторы продукта
   */
  getAvaibleShapes() {
    return [];
  }

  /**
   * Сервисные методы
   */

  triggerUpdate() {
    this.lastUpdate = Date.now();
  }

  _normalizeNumber(value, thresholds) {
    const min = thresholds.min;
    const max = thresholds.max;

    if (value < min) return min;
    if (value > max) return max;

    return value;
  }
};

export default Product;
