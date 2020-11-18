/**
 * Entities
 */
import Product from './Product';

/**
 * Utils
 */
import api from '@/utils/api.js';
import safeOpeningsSequence from '@/utils/safeOpeningsSequence.js';
import priceCalculator from '@/utils/priceCalculator.js';

/**
 * Icons
 */
import windowOnePane from '@images/configurator/window-one-pane.svg';
import windowTwoPanes from '@images/configurator/window-two-panes.svg';
import windowThreePanes from '@images/configurator/window-three-panes.svg';
import door from '@images/configurator/door.svg';
import windowOnePaneAndDoor from '@images/configurator/window-one-pane-and-door.svg';
import windowTwoPanesAndDoor from '@images/configurator/window-two-panes-and-door.svg';
import windowThreePanesAndDoor from '@images/configurator/window-three-panes-and-door.svg';
import windowDoorWindow from '@images/configurator/window-door-window.svg';

// TODO: возможно стоит перенести кэширование запросов в utils/api
const cache = {
  materials: [],
  ranges: null,
  brands: {},
  models: {},
  modelsData: {},

  _relations: {
    brandsByMaterial: {},
    modelsByBrand: {},
    modelsByMaterial: {}
  },

  setModels(models, materialId, brandId) {
    for (const model of models) {
      const modelId = model.id;

      if (!this._relations.modelsByMaterial[materialId]) {
        this._relations.modelsByMaterial[materialId] = [];
      }
      if (!this._relations.modelsByBrand[brandId]) {
        this._relations.modelsByBrand[brandId] = [];
      }

      this._relations.modelsByMaterial[materialId].push(modelId);
      this._relations.modelsByBrand[brandId].push(modelId);
      this.models[modelId] = model;
    }
  },
  getModels(materialId, brandId) {
    const modelsByBrand = this._relations.modelsByBrand[brandId] || [];
    const modelsByMaterial = this._relations.modelsByMaterial[materialId] || [];
    const models = Object.keys(this.models).map(modelId => {
      modelId = parseInt(modelId);
      if (
        modelsByBrand.includes(modelId) &&
        modelsByMaterial.includes(modelId)
      ) {
        return this.models[modelId];
      }
    });

    return models;
  },

  setBrandsRelatedToMaterial(brands, materialId) {
    this._relations.brandsByMaterial[materialId] = new Set();
    brands.forEach(brand => {
      this.brands[brand.id] = brand;
      this._relations.brandsByMaterial[materialId].add(brand.id);
    });
  },

  getBrandsByMaterial(materialId) {
    const brands = [];
    const brandsByMaterial = this._relations.brandsByMaterial[materialId];

    if (brandsByMaterial) {
      brandsByMaterial.forEach(brandID => {
        brands.push(this.brands[brandID]);
      });
    }

    return brands;
  }
};

/**
 * WindowProduct
 * @extends Product
 */
const WindowProduct = class extends Product {
  constructor() {
    super();

    this._name;

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

    Object.keys(this.defaults).forEach(key => {
      this[key] = this.defaults[key];
    });
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
      glazing: null,
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
      sillCasting: false,
      sillMounting: false,
      sillBrand: null,

      /**
       * Откосы
       */
      slopes: true,
      slopesDepth: null,

      /** Прочее */
      childLock: false,
      liftingToFloor: false,
      floor: null,

      /**
       * Настройки цвета
       */
      paintingType: null,
      frontFaceColor: null,
      backFaceColor: null,
      sealColor: null,

      coloredSlopes: false,
      coloredSill: false,

      _panesConfig: { windows: [], doors: [] }
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
   * Возвращает выбранную форму оконной конструкции
   */
  getSelectedShape() {
    return this.getAvaibleShapes().find(
      shape => shape.value === this.selectedShapeId
    );
  }

  /**
   * Допустимые формы оконных конструкций
   */
  getAvaibleShapes() {
    return [
      {
        value: 'windowOnePane',
        icon: windowOnePane,
        elements: [{ type: 'window', panes: [0] }]
      },
      {
        value: 'windowTwoPanes',
        icon: windowTwoPanes,
        elements: [{ type: 'window', panes: [0, 1] }]
      },
      {
        value: 'windowThreePanes',
        icon: windowThreePanes,
        elements: [{ type: 'window', panes: [0, 1, 0] }]
      },
      {
        value: 'door',
        icon: door,
        elements: [{ type: 'door', panes: [1] }]
      },
      {
        value: 'windowOnePaneAndDoor',
        icon: windowOnePaneAndDoor,
        elements: [
          { type: 'window', panes: [1] },
          { type: 'door', panes: [1] }
        ]
      },
      {
        value: 'windowTwoPanesAndDoor',
        icon: windowTwoPanesAndDoor,
        elements: [
          { type: 'window', panes: [0, 1] },
          { type: 'door', panes: [1] }
        ]
      },
      {
        value: 'windowDoorWindow',
        icon: windowDoorWindow,
        elements: [
          { type: 'window', panes: [1] },
          { type: 'door', panes: [1] },
          { type: 'window', panes: [2] }
        ]
      },
      {
        value: 'windowThreePanesAndDoor',
        icon: windowThreePanesAndDoor,
        elements: [
          { type: 'window', panes: [0, 1, 0] },
          { type: 'door', panes: [1] }
        ]
      }
    ];
  }

  async calculatePrice() {
    const elementsData = this.getElementsData();
    const windows = elementsData.windows;
    const doors = elementsData.doors;
    const elements = [...windows, ...doors];

    return await this.fetchModelData().then(data => {
      const priceTable = data.prices;
      let price = 0;

      elements.forEach(element => {
        const openingsCode = safeOpeningsSequence(element.panes.join(''));
        const priceMatrix = priceTable[element.type][openingsCode]['2'];
        const calculationResult = priceCalculator(
          element.width,
          element.height,
          priceMatrix
        );

        price = price + calculationResult.price;
      });

      return price;
    });
  }

  /**
   * Загрузки и кэширование данных с сервера
   */

  async fetchAvaibleMaterilas() {
    if (!cache.materials.length) {
      cache.materials = await api
        .call('windowsMaterials')
        .then(res => res.payload);
    }
    if (!this.materialId) this.materialId = cache.materials[0].id;

    return cache.materials;
  }

  /**
   * Берем доступные для выбранного материала брэнды.
   * Сначала проверяем кэш, и если там ничего нет, то обращаемся на сервер
   */
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
    const response = await api.call('windowsColors', {
      modelId: this.modelId
    });

    return response.payload;
  }

  async init() {
    await this.fetchAvaibleMaterilas();
    await this.fetchAvaibleBrands();
    await this.fetchAvaibleModels();
    await this.fetchModelData();
  }

  export() {
    const optionsToExport = {};

    Object.keys(this.defaults).forEach(key => {
      optionsToExport[key] = this[key];
    });

    return optionsToExport;
  }
};

if (process.env.NODE_ENV === 'development') {
  window.getCache = () => cache;
}

export default WindowProduct;
