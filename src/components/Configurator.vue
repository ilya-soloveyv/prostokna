<template>
  <div
    id="configurator"
    class="ppage"
    :class="{
      [`mq-${$mq}`]: true,
      desktop: isDesktop,
      tablet: isTablet,
      mobile: isMobile
    }"
    v-if="$store.state.configurator.isInit"
  >
    <MobileTypeBar v-if="isMobile" />

    <!-- Общие сведенья -->
    <section class="left column" v-if="!isMobile || mobileLayout === 'summary'">
      <Summary @submit="showSumbitModal = true" />
    </section>

    <!-- Выбор этапа на мобильном -->
    <section class="column" v-if="isMobile && mobileLayout === 'set-stage'">
      <MobileSetStage />
    </section>

    <!-- Опции конструкций -->
    <section
      class="main column"
      :style="mainComputedStyle"
      v-if="!isMobile || mobileLayout === 'edit'"
      ref="mainColumn"
    >
      <div class="layout-wrapper" v-if="productsWithCurrentType.length">
        <transition name="layout">
          <Header />
        </transition>
        <div v-for="porduct of productsWithCurrentType" :key="porduct.id">
          <transition name="layout">
            <WindowShapeLayout
              v-if="
                currentScreen === 'WindowProduct/shape' &&
                  porduct === currentProduct
              "
            />
            <WindowModelLayout
              v-if="
                currentScreen === 'WindowProduct/model' &&
                  porduct === currentProduct
              "
            />
            <WindowOtherLayout
              v-if="
                currentScreen === 'WindowProduct/other' &&
                  porduct === currentProduct
              "
            />
            <WindowColorLayout
              v-if="
                currentScreen === 'WindowProduct/color' &&
                  porduct === currentProduct
              "
            />

            <BalconyShapeLayout
              v-if="
                currentScreen === 'BalconyProduct/shape' &&
                  porduct === currentProduct
              "
            />
            <BalconyModelLayout
              v-if="
                currentScreen === 'BalconyProduct/model' &&
                  porduct === currentProduct
              "
            />
            <BalconyOtherLayout
              v-if="
                currentScreen === 'BalconyProduct/other' &&
                  porduct === currentProduct
              "
            />
            <BalconyColorLayout
              v-if="
                currentScreen === 'BalconyProduct/color' &&
                  porduct === currentProduct
              "
            />
          </transition>
        </div>
      </div>
      <div class="layout-wrapper" v-else>
        <transition name="layout">
          <div class="add-new">
            <div class="add-button" @click="() => addNewProduct(addNew.name)">
              {{ addNew.text }}
            </div>
          </div>
        </transition>
      </div>
    </section>
    <transition name="submit-modal">
      <SubmitModal v-if="showSumbitModal" @close="showSumbitModal = false" />
    </transition>
  </div>
</template>

<script>
import { Fragment } from 'vue-fragment';

import Summary from './Configurator/Summary.vue';
import Header from './Configurator/Header.vue';
import TypeSelector from './Configurator/TypeSelector.vue';

import MobileTypeBar from './Configurator/MobileTypeBar.vue';
import MobileSetStage from './Configurator/MobileSetStage.vue';
import SquareSelector from './Configurator/common/SquareSelector.vue';

import WindowShapeLayout from './Configurator/WindowShapeLayout.vue';
import WindowModelLayout from './Configurator/WindowModelLayout.vue';
import WindowOtherLayout from './Configurator/WindowOtherLayout.vue';
import WindowColorLayout from './Configurator/WindowColorLayout.vue';

import BalconyShapeLayout from './Configurator/BalconyShapeLayout.vue';
import BalconyModelLayout from './Configurator/BalconyModelLayout.vue';
import BalconyOtherLayout from './Configurator/BalconyOtherLayout.vue';
import BalconyColorLayout from './Configurator/BalconyColorLayout.vue';

import SubmitModal from './Configurator/SubmitModal.vue';

import api from '../utils/api';

import 'animate.css/source/fading_entrances/fadeIn.css';

const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('load', setVh);
window.addEventListener('resizeEnd', setVh);

export default {
  el: '#configurator',
  name: 'Configurator',
  components: {
    Fragment,
    Summary,
    Header,
    SquareSelector,
    TypeSelector,
    BalconyShapeLayout,
    BalconyModelLayout,
    BalconyOtherLayout,
    WindowShapeLayout,
    WindowModelLayout,
    WindowOtherLayout,
    WindowColorLayout,
    BalconyColorLayout,
    SubmitModal,
    MobileSetStage,
    MobileTypeBar
  },
  data() {
    return {
      isInitialized: false,
      mobileShowSummary: true,
      showSumbitModal: false,
      mobileLayout: null,
      mobileLayoutPart: 1
    };
  },
  provide() {
    return {
      configuratorComponent: this
    };
  },
  computed: {
    mainComputedStyle() {
      if (this.productsWithCurrentType.length) {
        return {};
      }

      return {
        alignItems: 'center',
        justifyContent: 'center'
      };
    },
    isDesktop() {
      return ['xl', 'lg', 'md'].includes(this.$mq);
    },
    isTablet() {
      return false;
    },
    isMobile() {
      return ['xs', 'sm'].includes(this.$mq);
    },
    currentProduct() {
      return this.$store.getters['configurator/currentProduct'];
    },
    currentScreen() {
      return this.$store.getters['configurator/currentScreen'];
    },
    productsWithCurrentType() {
      return this.$store.getters['configurator/productsWithCurrentType'];
    },
    addNew() {
      const avaibleTypes = this.$store.state.configurator.avaibleTypes;
      const selectedType = this.$store.getters['configurator/selectedType'];
      const typeClass = avaibleTypes[selectedType];

      return {
        name: typeClass.name,
        text: typeClass.addNew,
        icon: typeClass.icon
      };
    },

    /**
     * Работа с экранами настроек и все что для неё нужно
     */
    currentType() {
      return this.$store.getters['configurator/selectedType'];
    },
    currentTypeData() {
      const avaibleTypes = this.$store.state.configurator.avaibleTypes;

      return avaibleTypes[this.currentType];
    },
    currentScreen() {
      return this.$store.getters['configurator/currentScreen'];
    },
    avaibleScreens() {
      const avaibleScreens = this.currentTypeData.screens;

      return avaibleScreens.map(screen => `${this.currentType}/${screen}`);
    },
    currentIndex() {
      return this.avaibleScreens.indexOf(this.currentScreen);
    },
    canGoForward() {
      return this.currentIndex + 1 < this.avaibleScreens.length;
    },
    canGoBack() {
      return this.currentIndex > 0;
    }
  },
  watch: {
    isMobile() {
      this.mobileLayout = this.isMobile ? 'summary' : null;
    },
    currentScreen() {
      if (this.$refs.mainColumn) {
        this.$refs.mainColumn.scrollTop = 0;
      }
    }
  },
  methods: {
    selectScreen(screenPath) {
      this.$store.commit('configurator/currentScreen', screenPath);
    },
    nextScreen() {
      if (this.canGoForward) {
        this.selectScreen(this.avaibleScreens[this.currentIndex + 1]);
      }
    },
    prevScreen() {
      if (this.canGoBack) {
        this.selectScreen(this.avaibleScreens[this.currentIndex - 1]);
      }
    },
    async init() {
      await this.fetchRanges();
    },
    async fetchRanges() {
      const baseValues = await api
        .call('configuratorBaseData')
        .then(res => res.payload);
      this.$store.commit('configurator/setState', {
        baseValues: baseValues
      });
    },
    addNewProduct(type) {
      console.log(type);
      this.$store.commit('configurator/selectType', type);
      this.$store.dispatch('configurator/addProduct');
    }
  },
  mounted() {
    this.init();
    this.isInitialized = true;
    this.mobileLayout = this.isMobile ? 'summary' : null;
  },
  created() {
    this.$on('editProduct', () => {
      if (this.isMobile) {
        this.mobileLayout = 'set-stage';
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';
@import '@scss/mixins/scrollbar';

#configurator {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  max-height: calc(var(--vh, 1vh) * 100);
  background-color: $dark;
  color: $light;
  font-family: 'Montserrat', sans-serif;

  &.mq-xl {
    padding-left: 60px;
  }

  &.tablet,
  &.mobile {
    .column {
      max-width: 100vw;
      &.main {
        margin-right: 0;
      }
      & .layout-wrapper {
        width: 690px;
        margin: 0 auto;
      }
    }
  }

  &.mobile {
    width: 100%;
    overflow: hidden;
    padding-top: 60px;
  }
}

.layout-wrapper {
  position: relative;
  width: 738px;
  min-height: 100% !important;
  max-width: 100%;
  margin: 0 auto;

  .mobile & {
    width: calc(100% - 30px) !important;
    max-width: 360px;
  }
}

.column {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  padding: 98px 38px;
  overflow-x: hidden;
  overflow-y: auto;
  @include scrollbar;

  .mq-lg & .layout-wrapper {
    max-width: 593px !important;
  }

  .mobile & {
    padding: 124px 0 26px !important;
  }

  &.main {
    margin-right: 0;
    @media screen and (min-width: 1280px) {
      margin-right: 60px;
    }

    @media screen and (min-width: 1440px) {
      align-items: center;
      & .layout-wrapper {
        margin: 0 0 0 -72px;
      }
    }
  }

  &.left {
    min-width: 355px;
    max-width: 355px;
    padding-right: 22px;
    border-right: 1px $border-dark solid;

    .tablet & {
      min-width: 325px;
      max-width: 325px;
    }

    .mobile & {
      min-width: 100%;
      max-width: 100%;
      padding-left: 0;
      padding-right: 0;
      border: none;
    }
  }
}

.add-new {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 28px;
  border-radius: 11px;
}

.add-button {
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 18px 65px 18px 26px;
  border-radius: 25px;
  background-color: $gray-600;
  cursor: pointer;

  &:hover {
    &::after {
      transform: scale(1.05);
    }
  }

  &::after {
    content: '+';
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 25px;
    top: 10px;
    width: 30px;
    height: 30px;
    font-size: 21px;
    background-color: $gray-600;
    border: 2px dotted;
    border-color: $border-dark;
    border-radius: 50%;
    transition: transform $transition-cubic-1;
  }
}

// --- Анимации --- //

.layout-enter-active {
  animation: fadeIn $transition-time * 3;

  .mobile & {
    animation: none;
  }
}
.layout-leave-active {
  animation: fadeIn $transition-time * 3 reverse;
  .mobile & {
    animation: none;
  }
}

.submit-modal-enter-active {
  animation: fadeIn $transition-time * 2;
}
.submit-modal-leave-active {
  animation: fadeIn $transition-time reverse;
}
</style>

<style lang="scss">
// Фиксы для тёмной темы
body,
#top,
#top .menu {
  background-color: #363636;
}

.icon {
  color: #fff;
}

.bginput {
  color: #fff;

  border-color: #fff;
  input {
    color: #fff;
  }
  label {
    border-color: #82dcee;
  }
}

.menu {
  a {
    color: #fff !important;
  }

  a:hover,
  a:focus {
    color: #363636 !important;
    svg {
      color: #363636 !important;
    }
  }
}
</style>
