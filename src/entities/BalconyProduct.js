import Product from './Product';

import api from '@/utils/api.js';

import cache from './BalconyProduct/cache.js';
import avaibleShapes from './BalconyProduct/avaibleShapes.js';

import balconyIcon from '@images/configurator/balcony.svg';

const BalconyProduct = class extends Product {
  static title = 'Балконные конструкции';
  static screens = ['shape', 'model', 'other', 'color'];
  static screensNames = {
    shape: 'ТИПЫ И РАЗМЕРЫ',
    model: 'ПРОИЗВОДИТЕЛЬ И МОДЕЛЬ',
    other: 'ДОПОЛНИТЕЛЬНО',
    color: 'ЦВЕТ МАТЕРИАЛА'
  };
  static addNew = 'Добавить балконную конструкцию';
  static addMore = 'Добавить балконную конструкцию';
  static icon = balconyIcon;

  constructor() {
    super();
  }

  get avaibleOpenings() {
    return [
      { value: 0, text: 'Глухое' },
      { value: 1, text: 'Поворотное' },
      { value: 2, text: 'Поворотно-откидное' }
    ];
  }

  get defaults() {
    return {
      selectedShapeId: 'twoPanes',
      width: null,
      height: null,
      panesCount: 2,
      panesOpening: 0,
      //panesConfig: [],
      brandId: null,
      glazing: null,

      sill: true,
      sillLength: null,
      sillDepth: null,

      parapetOuter: false,
      parapetInner: false,
      siding: null,
      pvcPanels: null,

      outerSill: true,
      visor: true,

      mosquitoNet: true,
      mosquitoNetCount: null,

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
      ralColor: null
    };
  }

  getAvaibleShapes() {
    return avaibleShapes;
  }

  getElementsData() {}

  async calculatePrice() {
    return 100;
  }

  async init() {
    await this.fetchAvaibleBrands();
    await this.fetchAvaibleModels();
    await this.fetchModelData();

    const colors = await this.fetchAvaibleColors();

    if (!this.frontFaceColor) this.frontFaceColor = colors.frontFace[0].id;
    if (!this.backFaceColor) this.backFaceColor = colors.backFace[0].id;
    if (!this.sealColor) this.sealColor = colors.seal[0].id;
  }

  async fetchAvaibleBrands() {
    if (!cache.brands.length) {
      cache.brands = await api.call('balconyBrands').then(res => res.payload);
    }
    return cache.brands;
  }

  // TODO: привести к более читаемому виду
  async fetchAvaibleModels() {
    let models = cache.getModels(this.brandId);

    if (!models.length) {
      const response = await api.call('balconyModels', {
        brandId: this.brandId
      });

      models = response.payload;
      cache.setModels(models, this.brandId);
    }

    // Ставим значение по умолчанию если modelId не задано
    if (models.length && !this.modelId) {
      this.modelId = models[0].id;
    }

    return models;
  }

  // TODO: привести к более читаемому виду
  async fetchModelData() {
    if (cache.modelsData[this.modelId]) {
      return cache.modelsData[this.modelId];
    }

    const response = await api.call('balconyModelData', {
      modelId: this.modelId
    });

    cache.modelsData[this.modelId] = response.payload;

    return response.payload;
  }

  async fetchAvaibleColors() {
    if (!cache.colorsByModels[this.modelId]) {
      cache.colorsByModels[this.modelId] = await api
        .call('balconyColors', {
          materialId: this.materialId
        })
        .then(res => res.payload);
    }

    return cache.colorsByModels[this.modelId];
  }
};

export default BalconyProduct;
