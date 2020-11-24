/**
 * Сущности
 */
import Product from './Product';

/**
 * Утилиты
 */
import api from '@/utils/api.js';
import safeOpeningsSequence from '@/utils/safeOpeningsSequence.js';
import priceCalculator from '@/utils/priceCalculator.js';

/**
 * Дополнительные ресурсы используемые сущностью
 */
import cache from './WindowProduct/cache.js';
import avaibleShapes from './WindowProduct/avaibleShapes.js';

import windowIcon from '@images/configurator/window.png';

/**
 * WindowProduct
 * @extends Product
 */
const WindowProduct = class extends Product {
  static title = 'Оконные профили';
  static screens = ['shape', 'model', 'other', 'color'];
  static screensNames = {
    shape: 'ТИПЫ И РАЗМЕРЫ',
    model: 'ПРОИЗВОДИТЕЛЬ И МОДЕЛЬ',
    other: 'ДОПОЛНИТЕЛЬНО',
    color: 'ЦВЕТ МАТЕРИАЛА'
  };
  static addNew = 'Добавить окно';
  static addMore = 'Добавить ещё окно';
  static icon = windowIcon;

  constructor() {
    super();

    this._avaibleOpenings = {
      windows: [
        { value: 0, text: 'Глухое' },
        { value: 1, text: 'Поворотное' },
        { value: 2, text: 'Поворотно-откидное' }
      ],
      doors: [
        { value: 1, text: 'Поворотное' },
        { value: 2, text: 'Поворотно-откидное' }
      ]
    };
  }

  /**
   * Значения по умолчанию.
   *
   * Присваиваются объекту в конструкторе, а перечень ключей используется для экспорта настроек
   */
  get defaults() {
    return {
      selectedShapeId: 'windowOnePane',
      materialId: null,
      brandId: null,
      modelId: null,

      isFlipped: false,
      profile: null,
      glazing: 1,
      mountingDepth: null,

      /**
       * Основные размеры
       */
      windowWidth: null,
      windowHeight: null,
      doorWidth: null,
      doorHeight: null,

      /**
       * Подоконник
       */
      windowSill: true,
      sillLength: null,
      sillDepth: null,
      sillBrand: null,
      outerSill: null,

      /**
       * Откосы
       */
      slopes: true,
      slopesDepth: null,

      /** Прочее */
      childLock: false,

      /**
       * Настройки цвета
       */
      paintingType: null,
      frontFaceColor: null,
      backFaceColor: null,
      sealColor: null,
      ralColor: null,

      coloredSlopes: false,
      coloredSill: false,

      _panesConfig: { windows: [], doors: [] }
    };
  }

  get priceMiddleware() {
    return {
      slopes: price => (this.slopes ? price + this.slopesDepth : price)
    };
  }

  toggleFlipped() {
    this.isFlipped = !this.isFlipped;
    this._updated();
  }

  /**
   * Windows' Panes
   */
  getWindowsPanes() {
    const baseOpenings = this.getAvaiblePanes().windowPanes;
    const savedOpenings = this._panesConfig.windows;
    return baseOpenings.map((opening, i) => {
      return savedOpenings[i] !== undefined ? savedOpenings[i] : opening;
    });
  }
  setWindowPaneOpening(index, value) {
    this._panesConfig.windows[index] = value;
    this._updated();
  }
  getWindowPaneOpening(index) {
    return this.getWindowsPanes()[index];
  }

  /**
   * Doors' panes
   */
  getDoorsPanes() {
    const baseOpenings = this.getAvaiblePanes().doorPanes;
    const savedOpenings = this._panesConfig.doors;
    return baseOpenings.map((opening, i) => {
      return savedOpenings[i] ? savedOpenings[i] : opening;
    });
  }

  setDoorPaneOpening(index, value) {
    this._panesConfig.doors[index] = value;
    this._updated();
  }
  getDoorPaneOpening(index) {
    return this.getDoorsPanes()[index];
  }

  /**
   * getAvaiblePanes
   * @returns {Object} Avaible window and door panes for current shape
   */
  getAvaiblePanes() {
    const shapeElements = this.getSelectedShape().elements;
    const windows = shapeElements.filter(el => el.type === 'window');
    const doors = shapeElements.filter(el => el.type === 'door');
    const windowPanes = [];
    const doorPanes = [];

    windows.forEach(window => {
      window.panes.forEach(pane => windowPanes.push(pane));
    });

    doors.forEach(door => {
      door.panes.forEach(pane => doorPanes.push(pane));
    });

    return { windowPanes, doorPanes, openings: this._avaibleOpenings };
  }

  /**
   * Данные элементов оконной конструкции
   */
  getElementsData() {
    const shapeElements = this.getSelectedShape().elements;
    const windows = shapeElements.filter(el => el.type === 'window');
    const doors = shapeElements.filter(el => el.type === 'door');
    const windowElementWidth = Math.ceil(
      (this.windowWidth - this.doorWidth) / windows.length
    );
    const windowsPanesConfig = this._panesConfig.windows;
    const doorsPanesConfig = this._panesConfig.doors;

    // В базовый конфиг элементов складываем пользовательские настройки оконных створок
    for (let i in windows) {
      const windowIndex = parseInt(i);
      const panes = windows[windowIndex].panes;

      windows[windowIndex].width = windowElementWidth;
      windows[windowIndex].height = this.windowHeight;

      for (let i in panes) {
        const paneIndex = parseInt(i);
        if (windowsPanesConfig[paneIndex + windowIndex] !== undefined) {
          windows[windowIndex].panes[paneIndex] =
            windowsPanesConfig[paneIndex + windowIndex];
        }
      }
    }

    // Тоже самое делаем с дверьми
    for (const i in doors) {
      const doorIndex = parseInt(i);
      const panes = doors[doorIndex].panes;

      doors[doorIndex].width = this.doorWidth;
      doors[doorIndex].height = this.doorHeight;

      for (let i in panes) {
        const paneIndex = parseInt(i);
        if (doorsPanesConfig[paneIndex + doorIndex] !== undefined) {
          doors[doorIndex].panes[paneIndex] =
            doorsPanesConfig[paneIndex + doorIndex];
        }
      }
    }

    return { windows, doors };
  }

  /**
   * Допустимые формы оконных конструкций
   */
  getAvaibleShapes() {
    return avaibleShapes;
  }

  async calculatePrice() {
    const elementsData = this.getElementsData();
    const windows = elementsData.windows;
    const doors = elementsData.doors;
    const elements = [...windows, ...doors];
    const priceMiddlewareKeys = Object.keys(this.priceMiddleware);
    const priceTable = await this.fetchModelData().then(data => data.prices);

    let price = 0;

    for (const element of elements) {
      const openingsCode = safeOpeningsSequence(element.panes.join(''));
      const priceMatrix = priceTable[element.type][openingsCode][this.glazing];
      const calculationResult = priceCalculator(
        element.width,
        element.height,
        priceMatrix
      );

      price = price + calculationResult.price;
    }

    for (const key of priceMiddlewareKeys) {
      price = this.priceMiddleware[key].call(this, price);
    }

    return price;
  }

  async fetchAvaibleMaterilas() {
    if (!cache.materials.length) {
      cache.materials = await api
        .call('windowsMaterials')
        .then(res => res.payload);
    }
    if (!this.materialId) this.materialId = cache.materials[0].id;

    return cache.materials;
  }

  async fetchAvaibleBrands() {
    const materialId = this.materialId;
    let brands = cache.getBrandsByMaterial(materialId);

    // Если в кэше брендов не нашлось
    if (!brands.length) {
      const response = await api.call('windowsBrands', {
        materialId
      });

      brands = response.payload;
      cache.setBrandsRelatedToMaterial(brands, materialId);
    }

    // Устанавливаем значение по умолчанию
    if (brands.length && !this.brandId) {
      this.brandId = brands[0].id;
    }

    return brands;
  }

  async fetchAvaibleModels() {
    let models = cache.getModels(this.materialId, this.brandId);

    if (!models.length) {
      const response = await api.call('windowsModels', {
        materialId: this.materialId,
        brandId: this.brandId
      });

      models = response.payload;
      cache.setModels(models, this.materialId, this.brandId);
    }

    // Ставим значение по умолчанию если modelId не задано
    if (models.length && !this.modelId) {
      this.modelId = models[0].id;
    }

    return models;
  }

  async fetchModelData() {
    if (cache.modelsData[this.modelId]) {
      return cache.modelsData[this.modelId];
    }
    const response = await api.call('windowsModelData', {
      modelId: this.modelId
    });
    cache.modelsData[this.modelId] = response.payload;
    return response.payload;
  }

  async fetchAvaibleColors() {
    if (!cache.colorsByMaterials[this.materialId]) {
      cache.colorsByMaterials[this.materialId] = await api
        .call('windowsColors', {
          materialId: this.materialId
        })
        .then(res => res.payload);
    }

    return cache.colorsByMaterials[this.materialId];
  }

  async init() {
    await this.fetchAvaibleMaterilas();
    await this.fetchAvaibleBrands();
    await this.fetchAvaibleModels();
    await this.fetchModelData();

    const colors = await this.fetchAvaibleColors();

    if (!this.frontFaceColor) this.frontFaceColor = colors.frontFace[0].id;
    if (!this.backFaceColor) this.backFaceColor = colors.backFace[0].id;
    if (!this.sealColor) this.sealColor = colors.seal[0].id;
  }
};

if (process.env.NODE_ENV === 'development') {
  window.getWindowProductCache = () => cache;
}

export default WindowProduct;
