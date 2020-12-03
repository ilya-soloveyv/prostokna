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

/**
 * Начальное состояние конфигуратора
 */
const initialState = function() {
  return {
    // _нельзяБратьНапрямую
    _selectedType: null,
    _currentProduct: null,
    _currentScreen: null,

    // Можно брать напрямую
    isInit: false,
    baseValues: null,
    products: [],
    files: [],

    installation: false,
    liftingToFloor: false,
    floor: null,

    avaibleTypes: {
      WindowProduct,
      BalconyProduct
    },

    name: '',
    phone: '',
    comment: '',
    formData: null,

    submitState: null,
    requestId: null
  };
};

/**
 * Управление состоянием
 */
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    configurator: {
      namespaced: true, // <- Обрати внимание

      /**
       * Состояние
       *
       * HACK: начальное состояние вынесено во вне для того,
       * чтобы можно было легко сбросить все изменения стэйта.
       */
      state: initialState,

      /**
       * Геттеры
       */
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

        /**
         *
         */
        productsWithCurrentType(state, getters) {
          return getters.getProductsByType(getters.selectedType);
        },

        /**
         * Возвращает функцию которая служит для получения продуктов
         * принадлежащих к указаному типу
         */
        getProductsByType: state => type => {
          return state.products.filter(
            product => product instanceof state.avaibleTypes[type]
          );
        },

        /**
         * Вовращает функцию которая служит для получения количества продуктов
         * указанного типа
         */
        getProductCountByType: (state, getters) => type => {
          return getters.getProductsByType(type).length;
        }
      },

      /**
       * Мутации
       */
      mutations: {
        /**
         * Изменения состояния
         */
        setState(state, draft) {
          state = Object.assign(state, draft);
        },

        /**
         * Изменение продукта
         * @param {Function} cb
         */
        mutateCurrentProduct(state, cb) {
          const currentProduct = useGetter('configurator/currentProduct');

          cb(currentProduct);
          saveProducts(state.products);
        },

        /**
         * Принимает инициализированный продукт
         * @param {Product} product
         */
        addProduct: (state, product) => state.products.push(product),

        setInstallation: (state, value) => {
          const currentProduct = useGetter('configurator/currentProduct');
          state.installation = value;
          currentProduct.triggerUpdate();
          saveGlobalOptions(state);
        },
        setLifting: (state, value) => {
          const currentProduct = useGetter('configurator/currentProduct');
          state.liftingToFloor = value;
          currentProduct.triggerUpdate();
          saveGlobalOptions(state);
        },
        setFloor: (state, value) => {
          const currentProduct = useGetter('configurator/currentProduct');
          state.floor = value;
          currentProduct.triggerUpdate();
          saveGlobalOptions(state);
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
          state._currentScreen = screenPath;
          saveUI(state);
        },

        selectType(state, type) {
          state._currentScreen = null;
          state._currentProduct = null;
          state._selectedType = type;
          saveUI(state);
        },
        removeProduct(state, product) {
          state.products.splice(state.products.indexOf(product), 1);
          state._currentProduct = null;
        },

        /**
         *
         * @param {Product} product
         */
        setCurrentProduct(state, product) {
          state._currentProduct = product;
          saveUI(state);
        }
      },

      /**
       * Действия
       */
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
          const baseValues = state.baseValues;
          const newProduct = new typeObject();
          const referenceProduct = getters.productsWithCurrentType.pop();

          if (selectedType === 'WindowProduct') {
            newProduct.mountingDepth = baseValues.mountingDepth[0];
            newProduct.sillLength = baseValues.windowSill.x[0];
            newProduct.sillDepth = baseValues.windowSill.y[0];
            newProduct.slopesDepth = baseValues.windowSill.y[0];
          }

          // при добавлении нового продукта стараемся сделать его максимально похожим на предыдушщий того-же типа
          if (referenceProduct) {
            let lastProductData = referenceProduct.export();

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

          await newProduct.init(useState);

          commit('addProduct', newProduct);
          commit('setCurrentProduct', newProduct);
          dispatch('saveProducts');
        },
        async restoreProduct({ state, commit }, options = {}) {
          const product = new state.avaibleTypes[options.constructorName]();

          Object.keys(product.defaults).forEach(key => {
            if (options[key] !== undefined) {
              product[key] = options[key];
            }
          });

          await product.init(useState);

          commit('addProduct', product);
        },

        prepareFormData({ state, commit }) {
          const formData = new FormData();

          formData.append('name', state.name);
          formData.append('phone', state.phone);
          formData.append('comment', state.comment);

          state.products.forEach(product => {
            formData.append('products', JSON.stringify(product.export()));
          });
          state.files.forEach(file => formData.append('files', file));

          commit('setState', { formData });
        },

        async submit({ state, dispatch, commit }) {
          commit('setState', { submitState: 'pending' });
          dispatch('prepareFormData');

          fetch('/api/uploadCunfiguratorResult', {
            method: 'POST',
            body: state.formData
          })
            .then(res => res.json())
            .then(res => {
              commit('setState', {
                submitState: 'resolved',
                requestId: res.payload.requestId
              });
            })
            .catch(error => {
              console.error(error);
              commit('setState', {
                submitState: 'rejected'
              });
            });
        },

        reset({ commit, dispatch }) {
          commit('setState', initialState());
          saveProducts([]);
          saveUI({});
          saveGlobalOptions({});
        }
      }
    }
  }
});

restoreConfiguratorState({ db, store }).then(() =>
  useCommit('configurator/setState', { isInit: true })
);

new Vue({ ...Configurator, store });

/**
 * Да простят меня за это боги
 */
function useState() {
  return store.state;
}
function useGetter(getter) {
  return store.getters[getter];
}
function useCommit(mutation, payload) {
  return store.commit(mutation, payload);
}

/* ------------------------------------------------------------------------- */
/* --- Функции для работы с localForage ------------------------------------ */
/* ------------------------------------------------------------------------- */

/**
 * Сохранение свойств отобранных продуктов
 * @param {*} products
 */
function saveProducts(products) {
  db.setItem(
    'products',
    products.map(product => product.export())
  );
}

/**
 * Сохранение настроек интерфейса
 * @param {*} state
 */
function saveUI(state) {
  db.setItem('ui', {
    selectedType: state._selectedType,
    currentScreen: state._currentScreen
  });
}

/**
 * Сохранение настроек конфигуратора устанавлеваемых глобально
 * @param {*} state
 */
function saveGlobalOptions(state) {
  db.setItem('globalOptions', {
    name: state.name,
    phone: state.phone,
    comment: state.comment,
    installation: state.installation,
    liftingToFloor: state.liftingToFloor,
    floor: state.floor
  });
}

/**
 * Восстановление параметров
 * @param {object} context
 */
async function restoreConfiguratorState({ db, store }) {
  /**
   * Файлы
   */
  await db.getItem('files').then(files => {
    if (!files) return;
    store.commit('configurator/setState', { files });
  });

  /**
   * Продукты
   */
  await db.getItem('products').then(products => {
    if (!products) return;

    let promises = [];

    for (const product of products) {
      promises.push(store.dispatch('configurator/restoreProduct', product));
    }

    return Promise.all(promises);
  });

  /**
   * Глобальные опции необходимые для расчета
   */
  await db.getItem('globalOptions').then(globalOptions => {
    if (!globalOptions) return;
    store.commit('configurator/setState', globalOptions);
  });

  /**
   * Параметры интерфейса
   */
  await db.getItem('ui').then(ui => {
    if (!ui) return;

    store.commit('configurator/setState', {
      _selectedType: ui.selectedType,
      _currentScreen: ui.currentScreen
    });
  });
}
