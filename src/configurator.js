import Vue from 'vue';
import Vuex from 'vuex';
import VueMq from 'vue-mq';
import localforage from 'localforage';
import './utils/resizeEndEvent.js';

/**
 * Продукты
 */
import WindowProduct from './entities/WindowProduct';
import BalconyProduct from './entities/BalconyProduct';

/**
 * Компоненты
 */
import Configurator from './components/Configurator.vue';

/**
 * Изображения
 */
import windowIcon from '@images/configurator/window.png';
import balconyIcon from '@images/configurator/balcony.svg';

/**
 * Стили
 */
import '@scss/common/fullpage-nav.scss';

/**
 * Подключаем плагины Vue.js
 */
Vue.use(Vuex);
Vue.use(VueMq, {
  breakpoints: {
    // default breakpoints - customize this
    sm: 450,
    md: 1250,
    lg: Infinity
  }
});

/**
 * Хранение данных на стороне клиента
 */
const db = localforage.createInstance({
  driver: [localforage.INDEXEDDB],
  storeName: 'configurator'
});

const saveProducts = products => {
  db.setItem(
    'products',
    products.map(product => product.export())
  );
};

/**
 * Базовые настройки интерфейса конфигуратора
 */
const avaibleProductTypes = {
  windows: {
    name: 'Оконные профили',
    class: WindowProduct,
    screens: ['shape', 'model', 'other', 'color'],
    screensNames: {
      shape: 'ТИПЫ И РАЗМЕРЫ ОКОН',
      model: 'ПРОИЗВОДИТЕЛЬ И МОДЕЛЬ',
      other: 'ДОПОЛНИТЕЛЬНО',
      color: 'ЦВЕТ МАТЕРИАЛА'
    },
    icon: windowIcon
  },
  balcony: {
    name: 'Балконные конструкции',
    class: BalconyProduct,
    screens: ['shape', 'model', 'other', 'color'],
    screensNames: {
      shape: 'ТИПЫ И РАЗМЕРЫ',
      model: 'ПРОИЗВОДИТЕЛЬ И МОДЕЛЬ',
      other: 'ДОПОЛНИТЕЛЬНО',
      color: 'ЦВЕТ МАТЕРИАЛА'
    },
    icon: balconyIcon
  }
};

/**
 * Управление состоянием
 */
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    configurator: {
      namespaced: true, // <- Обрати внимание
      state: () => {
        return {
          // Нельзя брать напрямую
          _selectedType: null,
          _currentProduct: null,
          _currentScreen: null,

          // Можно брать напрямую
          ranges: null,
          products: [],
          files: [],
          // TODO: вынести за пределы сэйта то, что в итоге не будет изменяться
          avaibleTypes: avaibleProductTypes
        };
      },
      getters: {
        /**
         * Возвращает информацию о текущем экране в формате `выбранныйТипПродукта/выбранныйЭкран`
         */
        currentScreen(state, getters) {
          if (state._currentScreen) return state._currentScreen;

          const selectedType = getters.selectedType;
          const firstScreenForType =
            state.avaibleTypes[selectedType].screens[0];

          return `${selectedType}/${firstScreenForType}`;
        },

        /**
         * Возвращает объект текущего продукта
         *
         * !!! Изменять свойства продукта можно только через mutateCurrentProduct
         */
        currentProduct(state, getters) {
          return state._currentProduct || getters.productsWithCurrentType[0];
        },

        /**
         *
         */
        currentProductId(state, getters) {
          return getters.currentProduct.id;
        },

        /**
         * Возвращает ключ под которым хранится объект текущего типа продукта
         */
        selectedType(state) {
          return state._selectedType || Object.keys(state.avaibleTypes)[0];
        },

        productsWithCurrentType(state, getters) {
          const selectedType = getters.selectedType;

          return state.products.filter(
            product => product instanceof state.avaibleTypes[selectedType].class
          );
        },

        getProductsByType: state => type => {
          const typeClass = state.avaibleTypes[type].class;
          const products = state.products.filter(
            product => product instanceof typeClass
          );

          return products;
        },

        getProductCountByType: (state, getters) => type => {
          const products = getters.getProductsByType(type);
          return products.length;
        }
      },
      mutations: {
        setFiles(state, files) {
          state.files = files;
        },
        addFile(state, file) {
          state.files.push(file);
          db.setItem('files', state.files);
        },
        removeFile(state, index) {
          state.files.splice(index, 1);
          db.setItem('files', state.files);
        },
        setRanges(state, ranges) {
          state.ranges = ranges;
        },
        currentScreen(state, screenPath) {
          const [type, screen] = screenPath.split('/');
          const avaibleTypes = Object.keys(state.avaibleTypes);
          const avaibleScreens = state.avaibleTypes[type].screens;

          if (avaibleTypes.includes(type) && avaibleScreens.includes(screen)) {
            state._currentScreen = screenPath;
          } else {
            console.error('Unavaible screen!');
          }
        },
        mutateCurrentProduct(state, cb) {
          let selectedType = state._selectedType;
          let currentProduct = state._currentProduct;

          if (!selectedType) {
            selectedType = Object.keys(state.avaibleTypes)[0];
          }

          if (!currentProduct) {
            currentProduct = state.products.find(
              product =>
                product instanceof state.avaibleTypes[selectedType].class
            );
          }

          cb(currentProduct);
          saveProducts(state.products);
        },
        selectType(state, type) {
          state._selectedType = type;
          state._currentProduct = null;
        },
        addProduct(state, product) {
          state.products.push(product);
        },
        removeProduct(state, product) {
          const indexToRemove = state.products.indexOf(product);
          state.products.splice(indexToRemove, 1);
          state._currentProduct = null;
        },
        setCurrentProduct(state, product) {
          state._currentProduct = product;
        }
      },
      actions: {
        saveProducts({ state }) {
          saveProducts(state.products);
        },
        removeProduct({ getters, commit, dispatch }, product) {
          commit('removeProduct', product);
          dispatch('saveProducts');
        },
        async addProduct({ state, getters, commit, dispatch }) {
          const selectedType = getters.selectedType;
          const typeObject = state.avaibleTypes[selectedType];
          const ranges = state.ranges;
          const newProduct = new typeObject.class();

          newProduct.mountingDepth = ranges.mountingDepth[0];
          newProduct.sillLength = ranges.windowSill.x[0];
          newProduct.sillDepth = ranges.windowSill.y[0];
          newProduct.slopesDepth = ranges.windowSill.y[0];

          const productsLikeThis = getters['productsWithCurrentType'];

          // при добавлении нового продукта стараемся сделать его максимально похожим на предыдушщий того-же типа
          if (productsLikeThis.length) {
            const lastProductData = productsLikeThis.pop().export();
            [
              'materialId',
              'brandId',
              'modelId',
              'profile',
              'glazing',
              'mountingDepth',
              'sillDepth',
              'sillCasting',
              'sillMounting',
              'sillBrand',
              'slopes',
              'slopesDepth',
              'childLock',
              'liftingToFloor',
              'floor',
              'paintingType',
              'frontFaceColor',
              'backFaceColor',
              'sealColor',
              'coloredSlopes',
              'coloredSill'
            ].forEach(key => {
              if (lastProductData[key] !== undefined) {
                newProduct[key] = lastProductData[key];
              }
            });
          }

          await newProduct.init();

          commit('addProduct', newProduct);
          dispatch('saveProducts');
        },
        async restoreProduct({ state, getters, commit }, options = {}) {
          const selectedType = getters.selectedType;
          const typeObject = state.avaibleTypes[selectedType];
          const product = new typeObject.class();

          Object.keys(product.defaults).forEach(key => {
            if (options[key] !== undefined) {
              product[key] = options[key];
            }
          });

          await product.init();

          commit('addProduct', product);
        },
        setShape({ getters }, shape) {
          getters.currentProduct.setSelectedShape(shape);
        }
      }
    }
  }
});

db.getItem('files', (err, files) => {
  if (!err && files) {
    store.commit('configurator/setFiles', files);
  }
});

db.getItem('products', (err, products) => {
  if (!err && products) {
    products.forEach(product => {
      store.dispatch('configurator/restoreProduct', product);
    });
  }
});

new Vue({ ...Configurator, store });
