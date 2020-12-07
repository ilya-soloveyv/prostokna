import Product from './Product';

import api from '@/utils/api.js';
import priceCalculator from '@/utils/priceCalculator.js';

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
      depth: null,
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

  get pricePipeline() {
    return [
      /**
       * Цвет
       */
      async function colors(price) {
        const byId = id => item => item.id === id;

        const colors = await this.fetchAvaibleColors();
        const paintingCoefficient = await this.fetchModelData().then(
          data => data.paintingCoefficient
        );
        const frontFaceColor = colors.frontFace.find(byId(this.frontFaceColor));
        const backFaceColor = colors.backFace.find(byId(this.backFaceColor));
        const hasNonstandardColor =
          frontFaceColor.nonstandard || backFaceColor.nonstandard;
        const nonstandardAddition = hasNonstandardColor
          ? paintingCoefficient.nonstandardAddition
          : 0;

        if (this.paintingType === 1 && !frontFaceColor.default) {
          return price * (paintingCoefficient.oneSide + nonstandardAddition);
        }

        if (
          this.paintingType === 2 &&
          (!frontFaceColor.default || !backFaceColor.default)
        ) {
          return price * (paintingCoefficient.twoSides + nonstandardAddition);
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

        const installationPrice = await this.fetchModelData().then(
          data => data.installationPrice
        );
        const areaInSqareMeters = this.getArea() / 10 ** 6;

        return price + areaInSqareMeters * installationPrice;
      },

      /**
       * Отделка сайдингом
       */
      async function siding(price) {
        if (!this.parapetOuter) return price;

        const pricePerSquareMeter = this.baseValues.parapetPaneling.outer;

        return price + pricePerSquareMeter * this.siding;
      },

      /**
       * Отделка ПВХ панелями
       */
      async function pvcPanels(price) {
        if (!this.parapetInner) return price;

        const pricePerSquareMeter = this.baseValues.parapetPaneling.inner;

        return price + pricePerSquareMeter * this.pvcPanels;
      },

      /**
       * Подоконник
       */
      async function sill(price) {
        if (!this.sill) return price;

        const sillPrice = this.baseValues.sillPrice;
        const sillDepth = Math.round(this.sillDepth / 50) * 50;
        const pricePerCm = sillPrice[sillDepth][this.coloredSill ? 1 : 0];

        return price + pricePerCm * (this.sillLength / 10);
      },

      /**
       * Ручной подъём на этаж
       */
      async function lifting(price) {
        const configuratorState = this.globalStateHook().configurator;
        const liftingToFloor = configuratorState.liftingToFloor;
        const floor = configuratorState.floor;

        if (!liftingToFloor || floor < 2) return price;

        const pricePerFloor = 26;
        const areaInSqareMeters = this.getArea() / 10 ** 6;

        return price + pricePerFloor * areaInSqareMeters * (floor - 1);
      },

      /**
       * Козырёк
       */
      function visor(price) {
        if (!this.visor) return price;
        return price + (this.width / 1000) * this.baseValues.visor;
      },

      /**
       * Отлив
       */
      function outerSill(price) {
        if (!this.outerSill) return price;
        return price + (this.width / 1000) * this.baseValues.outerSill;
      },

      function mosquitoNet(price) {
        if (!this.mosquitoNet) return price;

        const netsArea =
          (this.getArea() / this.panesCount) * this.mosquitoNetCount;

        return price + (netsArea / 100) * this.baseValues.mosquitoNet;
      }
    ];
  }

  getAvaibleShapes() {
    return avaibleShapes;
  }

  getElementsData() {}

  async calculatePrice() {
    const priceTable = await this.fetchModelData().then(data => data.prices);

    let price = priceCalculator(
      this.width,
      this.height,
      priceTable[this.selectedShapeId][this.glazing]
    ).price;

    for (const pipeFunction of this.pricePipeline) {
      price = await pipeFunction.call(this, price);
    }

    return Math.ceil(price);
  }

  /**
   * Вычисление площади проёма в мм²
   */
  getArea() {
    return this.width * this.height;
  }

  async init(globalStateHook) {
    this.globalStateHook = globalStateHook;

    await this.fetchAvaibleBrands();
    await this.fetchAvaibleModels();

    const modelData = await this.fetchModelData();
    const colors = await this.fetchAvaibleColors();

    if (!this.frontFaceColor) this.frontFaceColor = colors.frontFace[0].id;
    if (!this.backFaceColor) this.backFaceColor = colors.backFace[0].id;
    if (!this.sealColor) this.sealColor = colors.seal[0].id;

    if (!this.glazing) this.glazing = modelData.glazings[0].id;

    if (!this.sillDepth)
      this.sillDepth = parseInt(Object.keys(this.baseValues.sillPrice)[0]);
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
