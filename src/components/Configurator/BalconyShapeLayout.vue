<template>
  <div class="row window-shape-layout" v-if="products.length">
    <div
      class="col-12 col-lg-7 col-xl-6"
      v-if="!isMobile || mobileLayoutPart === 1"
    >
      <SquareSelector
        :options="shapesGrid"
        :selected="currentProduct.selectedShapeId"
        @change="val => setProductOption('selectedShapeId', val)"
      />
    </div>
    <div
      class="col-12 col-lg-5 col-xl-6"
      v-if="!isMobile || mobileLayoutPart === 2"
    >
      <Slider
        label="Длина"
        :min="baseValues.x[0]"
        :max="maxWidth"
        :value="currentProduct.width"
        @change="val => setProductOption('width', val)"
      />
      <Slider
        label="Высота"
        :min="baseValues.y[0]"
        :max="baseValues.y[1]"
        :value="currentProduct.height"
        @change="val => setProductOption('height', val)"
      />
      <Slider
        label="Глубина"
        v-if="baseValues.z"
        :min="baseValues.z[0]"
        :max="baseValues.z[1]"
        :value="currentProduct.depth"
        @change="val => setProductOption('depth', val)"
      />
      <Counter
        label="СТВОРОКИ"
        v-if="showPanesCount"
        :min="baseValues.panes.min"
        :max="baseValues.panes.max"
        :value="currentProduct.panesCount"
        @change="val => setProductOption('panesCount', val)"
      />
      <Selector
        label="ОТКРЫВАНИЕ СТВОРКИ"
        v-if="baseValues.z"
        :options="currentProduct.avaibleOpenings"
        :selected="currentProduct.panesOpening"
        @change="val => setProductOption('panesOpening', parseInt(val))"
      />
    </div>

    <div class="col-12" v-if="isMobile">
      <MobileNaigation @prev="mobilePrev" @next="mobileNext" />
    </div>
  </div>
</template>

<script>
import { Fragment } from 'vue-fragment';
/**
 * Components
 */
import SquareSelector from './common/SquareSelector.vue';
import Selector from './common/Selector.vue';
import Slider from './common/Slider.vue';
import Counter from './common/Counter.vue';
import CheckBox from './common/CheckBox.vue';
import MobileNaigation from './common/MobileNaigation.vue';

/**
 * Utils
 */
import mapAsOptions from '@/utils/mapAsOptions.js';
import s from '@/utils/safeOpeningsSequence.js';

export default {
  name: 'BalconyShapeLayout',
  components: {
    SquareSelector,
    Selector,
    Slider,
    Counter,
    CheckBox,
    Fragment,
    MobileNaigation
  },
  inject: ['configuratorComponent'],
  data() {
    return {
      mobileLayoutPart: this.configuratorComponent.mobileLayoutPart
    };
  },
  computed: {
    showPanesCount() {
      return this.baseValues.panes.min !== this.baseValues.panes.max;
    },
    maxWidth() {
      const maxPanes = this.baseValues.panes.max;
      const maxPaneWidth = this.$store.state.configurator.baseValues
        .balconyPaneWidth[1];
      const maxWidth = maxPanes * maxPaneWidth;

      return this.baseValues.x[1] > maxWidth ? maxWidth : this.baseValues.x[1];
    },
    prevScreen() {
      return this.configuratorComponent.prevScreen;
    },
    nextScreen() {
      return this.configuratorComponent.nextScreen;
    },
    isMobile() {
      return this.configuratorComponent.isMobile;
    },
    baseValues() {
      const shapeId = this.currentProduct.selectedShapeId;
      return this.$store.state.configurator.baseValues?.balcony[shapeId];
    },
    products() {
      return this.$store.getters['configurator/productsWithCurrentType'];
    },
    currentProduct() {
      return this.$store.getters['configurator/currentProduct'];
    },
    shapesGrid() {
      const grid = this.currentProduct
        ? [...this.currentProduct.getAvaibleShapes()]
        : [];

      return grid;
    }
  },
  methods: {
    mobilePrev() {
      if (this.mobileLayoutPart === 2) return (this.mobileLayoutPart = 1);
      this.configuratorComponent.mobileLayout = 'summary';
    },
    mobileNext() {
      if (this.mobileLayoutPart === 1) return (this.mobileLayoutPart = 2);
      this.nextScreen();
    },

    setProductOption(key, value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p[key] = value;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.window-shape-layout {
  position: absolute;
  left: 0;
  right: 0;
}

.fade-enter-active {
  animation: fade-in $transition-time * 3;
}
.fade-leave-active {
  animation: fade-in $transition-time * 3 reverse;
}
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
