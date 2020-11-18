<template>
  <transition name="fade">
    <div class="row window-shape-layout" v-if="products.length">
      <div
        class="col-12 position-absolute"
        v-for="product of products"
        :key="product.id"
      >
        <transition name="fade">
          <div class="row" v-if="product === currentProduct">
            <div class="col-12 col-lg-6">
              <SquareSelector
                :options="shapesGrid"
                :selected="currentProduct.selectedShapeId"
                @change="val => setProductOption('selectedShapeId', val)"
              />
            </div>
            <div class="col-12 col-lg-6">
              <Slider
                label="Ширина"
                :value="currentProduct.width"
                @change="val => setProductOption('width', val)"
              />
              <Slider
                label="Высота"
                :value="currentProduct.height"
                @change="val => setProductOption('height', val)"
              />
              <Counter
                label="СТВОРОКИ"
                :value="currentProduct.panesCount"
                @change="val => setProductOption('panesCount', val)"
              />
              <Selector
                label="ОТКРЫВАНИЕ СТВОРКИ"
                :options="currentProduct.avaibleOpenings"
                :selected="currentProduct.panesOpening"
                :disabled="!currentProduct.panesCount"
                @change="val => setProductOption('panesOpening', parseInt(val))"
              />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
/**
 * Components
 */
import SquareSelector from './common/SquareSelector.vue';
import Selector from './common/Selector.vue';
import Slider from './common/Slider.vue';
import Counter from './common/Counter.vue';
import CheckBox from './common/CheckBox.vue';
import CircleProgress from './common/CircleProgress.vue';
import WindowDescription from './WindowDescription.vue';

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
    CircleProgress,
    WindowDescription
  },
  data() {
    return {
      testOptions: [{ value: 1, text: '123' }]
    };
  },
  computed: {
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
