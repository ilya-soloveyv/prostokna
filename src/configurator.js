// Основные библиотеки
import Vue from 'vue';
import Vuex from 'vuex';
import VueMq from 'vue-mq';
import localforage from 'localforage';

// Вспомогательные утилиты
import './utils/resizeEndEvent.js';

// Продукты
import WindowProduct from './entities/WindowProduct';
import BalconyProduct from './entities/BalconyProduct';

// Компоненты
import Configurator from './components/Configurator.vue';

// Стили
import '@scss/common/fullpage-nav.scss';

// Подключаем плагины Vue.js
Vue.use(Vuex);
Vue.use(VueMq, {
  breakpoints: {
    // Используются стандартные брейкпоинты бутстрапа
    xs: 540,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: Infinity
  }
});

/**
 * Хранение данных на стороне клиента
 *
 * @namespace `configurator`
 * @item `products`
 * @item `ui`
 * @item `globalOptions`
 * @item `files`
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
const saveUI = state => {
  db.setItem('ui', {
    selectedType: state._selectedType,
    currentProduct: state._currentProduct,
    currentScreen: state._currentScreen
  });
};
const saveGlobalOptions = state => {
  db.setItem('globalOptions', {
    installation: state.installation,
    liftingToFloor: state.liftingToFloor,
    floor: state.floor
  });
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
          // _нельзяБратьНапрямую
          _selectedType: null,
          _currentProduct: null,
          _currentScreen: null,

          // Можно брать напрямую
          ranges: null,
          products: [],
          files: [],

          installation: false,
          liftingToFloor: false,
          floor: null,
          // TODO: вынести за пределы сэйта то, что в итоге не будет изменяться
          avaibleTypes: {
            WindowProduct,
            BalconyProduct
          }
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
            product => product instanceof state.avaibleTypes[selectedType]
          );
        },

        getProductsByType: state => type => {
          const typeClass = state.avaibleTypes[type];
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
        setFiles: (state, files) => (state.files = files),
        setRanges: (state, ranges) => (state.ranges = ranges),
        addProduct: (state, product) => state.products.push(product),
        restoreUI(state, ui) {
          state._selectedType = ui.selectedType;
          state._currentProduct = ui.currentProduct;
          state._currentScreen = ui.currentScreen;
        },

        setInstallation: (state, value) => {
          state.installation = value;
          saveGlobalOptions(state);
        },
        setLifting: (state, value) => {
          state.liftingToFloor = value;
          saveGlobalOptions(state);
        },
        setFloor: (state, value) => {
          state.floor = value;
          saveGlobalOptions(state);
        },

        restoreGlobalOptions(state, options) {
          for (const key in options) {
            state[key] = options[key];
          }
        },

        addFile(state, file) {
          state.files.push(file);
          db.setItem('files', state.files);
        },
        removeFile(state, index) {
          state.files.splice(index, 1);
          db.setItem('files', state.files);
        },
        currentScreen(state, screenPath) {
          const [type, screen] = screenPath.split('/');
          const avaibleTypes = Object.keys(state.avaibleTypes);
          const avaibleScreens = state.avaibleTypes[type].screens;

          if (avaibleTypes.includes(type) && avaibleScreens.includes(screen)) {
            state._currentScreen = screenPath;
            saveUI(state);
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
              product => product instanceof state.avaibleTypes[selectedType]
            );
          }

          cb(currentProduct);
          saveProducts(state.products);
        },
        selectType(state, type) {
          state._currentScreen = null;
          state._currentProduct = null;
          state._selectedType = type;
          saveUI(state);
        },
        removeProduct(state, product) {
          const indexToRemove = state.products.indexOf(product);
          state.products.splice(indexToRemove, 1);
          state._currentProduct = null;
        },
        setCurrentProduct(state, product) {
          state._currentProduct = product;
          saveUI(state);
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
          const newProduct = new typeObject();

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
        async restoreProduct({ state, commit }, options = {}) {
          const product = new state.avaibleTypes[options.constructorName]();

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

db.getItem('globalOptions', (err, globalOptions) => {
  if (!err && globalOptions) {
    console.log('globalOptions', globalOptions);
    store.commit('configurator/restoreGlobalOptions', globalOptions);
  }
});

db.getItem('ui', (err, ui) => {
  if (!err && ui) {
    store.commit('configurator/restoreUI', ui);
  }
});

new Vue({ ...Configurator, store });
