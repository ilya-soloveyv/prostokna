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

  get exporters() {
    return {
      openings: () => this.getElementsData()
    };
  }

  /**
   * Рассчет стоимости опций
   */
  get pricePipeline() {
    return [
      /**
       * Цвет изделия
       */
      async function colors(price) {
        const byId = id => item => item.id === id;

        const colors = await this.fetchAvaibleColors();
        const materials = await this.fetchAvaibleMaterilas();
        const material = materials.find(byId(this.materialId));
        const frontFaceColor = colors.frontFace.find(byId(this.frontFaceColor));
        const backFaceColor = colors.backFace.find(byId(this.backFaceColor));
        const hasNonstandardColor =
          frontFaceColor.nonstandard || backFaceColor.nonstandard;
        const nonstandardAddition = hasNonstandardColor
          ? material.paintingCoefficient.nonstandardAddition
          : 0;

        if (this.paintingType === 1 && !frontFaceColor.default) {
          return (
            price * (material.paintingCoefficient.oneSide + nonstandardAddition)
          );
        }

        if (
          this.paintingType === 2 &&
          (!frontFaceColor.default || !backFaceColor.default)
        ) {
          return (
            price *
            (material.paintingCoefficient.twoSides + nonstandardAddition)
          );
        }

        return price;
      },

      /**
       * Монтаж
       */
      async function installation(price) {
        if (!this.globalStateHook().configurator.installation) {
          return price;
        }

        const materials = await this.fetchAvaibleMaterilas();
        const material = materials.find(
          material => material.id === this.materialId
        );
        const areaInSqareMeters = this.getArea() / 10 ** 6;

        return price + areaInSqareMeters * material.price;
      },

      /**
       * Ручной подъём на этаж
       */
      async function lifting(price) {
        const configuratorState = this.globalStateHook().configurator;
        const liftingToFloor = configuratorState.liftingToFloor;
        const floor = configuratorState.floor;

        if (!liftingToFloor || floor < 2) return price;

        const pricePerFloor = this.baseValues.pricePerFloor;
        const areaInSqareMeters = this.getArea() / 10 ** 6;

        return price + pricePerFloor * areaInSqareMeters * (floor - 1);
      },

      /**
       * Детский замок
       */
      function childLock(price) {
        return this.childLock ? price + 400 : price;
      },

      /**
       * Подоконник
       */
      async function windowSill(price) {
        if (!this.windowSill) return price;

        const sills = this.baseValues.sillsBrands;
        const selectedSill = sills.find(sill => sill.id === this.sillBrand);
        const sillDepth = Math.round(this.sillDepth / 50) * 50;
        const pricePerCm =
          selectedSill.price[sillDepth][this.coloredSill ? 1 : 0];

        return price + pricePerCm * (this.sillLength / 10);
      },

      /**
       * Отлив
       */
      function outerSill(price) {
        if (!this.outerSill) return price;
        return price + (this.windowWidth / 1000) * this.baseValues.outerSill;
      },

      /**
       * Откосы
       */
      async function slopes(price) {
        if (!this.slopes) return price;

        const byId = id => item => item.id === id;

        const { windows, doors } = this.getElementsData();
        const hasWindows = windows.length;
        const hasDoors = doors.length;
        const slopesDepth = this.slopesDepth;

        let slopesLength = 0;

        if (hasWindows && hasDoors) {
          slopesLength =
            this.windowWidth +
            this.windowHeight * 2 +
            (this.doorHeight - this.windowHeight) * 2 +
            500;
        } else if (!hasWindows && hasDoors) {
          slopesLength = this.doorWidth + this.doorHeight * 2 + 300;
        } else {
          slopesLength = this.windowWidth + this.windowHeight * 2 + 300;
        }

        const slopesArea = (slopesLength * slopesDepth) / 10 ** 6;
        const material = await this.fetchAvaibleMaterilas().then(materials =>
          materials.find(byId(this.materialId))
        );
        const slopesInstallation = this.baseValues.slopesInstallation;

        let sillsInstallationPrice = 0;

        if (this.globalStateHook().configurator.installation) {
          if (slopesDepth > 500) {
            sillsInstallationPrice = slopesInstallation['500'];
          } else if (slopesDepth > 300) {
            sillsInstallationPrice = slopesInstallation['300'];
          } else {
            sillsInstallationPrice = slopesInstallation['0'];
          }
        }

        console.debug(`Откосы окна ${this.id}`);
        console.debug('Общая длина откосов в мм:', slopesLength);
        console.debug('Глубина откосов в мм:', slopesDepth);
        console.debug('Прощадь откосов в м²:', slopesArea);
        console.debug('Цветные откосы:', this.coloredSlopes ? 'Да' : 'Нет');

        const variant = this.coloredSlopes ? 'colored' : 'default';
        const slopesPrice = material.slopesPrice[variant] * slopesArea;
        const cornerPrice =
          material.slopesCornerPrice[variant] * (slopesLength / 10);
        const installationPrice =
          (slopesLength / 1000) * sillsInstallationPrice;

        console.debug('Стоимость откосов:', slopesPrice);
        console.debug('Стоимость уголков:', cornerPrice);
        console.debug('Стоимость монтажа откосов:', installationPrice);
        console.debug('\r\n');

        return price + slopesPrice + cornerPrice + installationPrice;
      }
    ];
  }

  toggleFlipped() {
    this.isFlipped = !this.isFlipped;
    this.triggerUpdate();
  }

  /**
   * Вычисление площади проёма в мм²
   */
  getArea() {
    const { windows, doors } = this.getElementsData();
    const elements = [...windows, ...doors];
    let area = 0;

    elements.forEach(element => {
      area = area + element.width * element.height;
    });

    return area;
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
    this.triggerUpdate();
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
    this.triggerUpdate();
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
    const windowsPanesConfig = this._panesConfig.windows;
    const doorsPanesConfig = this._panesConfig.doors;

    const windowWidth = windows.length ? this.windowWidth : 0;
    const doorWidth = doors.length ? this.doorWidth : 0;

    const windowElementWidth = Math.ceil(
      (windowWidth - doorWidth) / windows.length
    );

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

    for (const pipeFunction of this.pricePipeline) {
      price = await pipeFunction.call(this, price);
    }

    return Math.round(price);
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

  async init(globalStateHook) {
    this.globalStateHook = globalStateHook;

    await this.fetchAvaibleMaterilas();
    await this.fetchAvaibleBrands();
    await this.fetchAvaibleModels();
    await this.fetchModelData();

    const colors = await this.fetchAvaibleColors();

    if (!this.paintingType) this.paintingType = 1;
    if (!this.frontFaceColor) this.frontFaceColor = colors.frontFace[0].id;
    if (!this.backFaceColor) this.backFaceColor = colors.backFace[0].id;
    if (!this.sealColor) this.sealColor = colors.seal[0].id;

    if (!this.sillBrand) this.sillBrand = this.baseValues.sillsBrands[0].id;
  }
};

if (process.env.NODE_ENV === 'development') {
  window.getWindowProductCache = () => cache;
}

export default WindowProduct;
