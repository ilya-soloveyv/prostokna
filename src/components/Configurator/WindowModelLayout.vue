<template>
  <div class="d-flex row window-model-layout" :class="{ dimmed }">
    <div class="col-12 col-lg-6 order-2 order-lg-1">
      <Selector
        label="ПРОИЗВОДИТЕЛЬ"
        :options="brands"
        :selected="brandId"
        @change="selectBrand"
      />
      <Selector
        label="МОДЕЛЬ"
        :options="models"
        :selected="modelId"
        @change="selectModel"
      />
      <Slider
        label="МОНТАЖНАЯ ГЛУБИНА"
        :min="mountingDepth[0]"
        :max="mountingDepth[1]"
        :value="currentProduct.mountingDepth"
        @change="setMountingDepth"
      />
      <Selector
        label="КАМЕРНОСТЬ ПРОФИЛЯ"
        v-if="profiles.length"
        :options="profiles"
        :selected="currentProduct.profile"
        @change="setProfile"
      />
      <Selector
        label="СТЕКЛОПАКЕТ"
        :options="glazings"
        :selected="currentProduct.glazing"
        @change="setGlazing"
      />
    </div>
    <div
      class="col-12 col-lg-6 order-1 order-lg-2"
      :class="{ 'not-desktop': ['xl', 'lg'].includes($mq) }"
    >
      <WindowDescription @setBgDimm="setDimmed" />
    </div>
  </div>
</template>

<script>
/**
 * Components
 */
import Selector from './common/Selector.vue';
import Slider from './common/Slider.vue';
import WindowDescription from './WindowDescription.vue';

/**
 * Utils
 */
import mapAsOptions from '@/utils/mapAsOptions';

export default {
  name: 'WindowModelLayout',
  components: { Selector, Slider, WindowDescription },
  data() {
    return {
      brands: [],
      models: [],
      modelData: {},
      dimmed: false
    };
  },
  computed: {
    profiles() {
      return this.modelData.profiles
        ? mapAsOptions(this.modelData.profiles)
        : [];
    },
    glazings() {
      return this.modelData.glazings
        ? mapAsOptions(this.modelData.glazings)
        : [];
    },
    products() {
      return this.$store.getters['configurator/productsWithCurrentType'];
    },
    currentProduct() {
      return this.$store.getters['configurator/currentProduct'];
    },
    brandId() {
      return this.currentProduct.brandId;
    },
    modelId() {
      return this.currentProduct.modelId;
    },
    mountingDepth() {
      return this.$store.state.configurator.ranges.mountingDepth;
    }
  },
  watch: {
    currentProduct() {
      this.fetchAll();
    }
  },
  methods: {
    setDimmed(value) {
      this.dimmed = value;
    },
    setProfile(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.profile = parseInt(value);
      });
    },
    setGlazing(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.glazing = value;
      });
    },
    selectBrand(id) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.brandId = parseInt(id);
      });
    },
    selectModel(id) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.modelId = parseInt(id);
      });
    },
    setMountingDepth(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.mountingDepth = parseInt(value);
      });
    },
    async fetchAll() {
      this.brands = await this.fetchBrands();
      if (!this.brands.length) return;
      this.models = await this.fetchModels();
      if (!this.models.length) return;
      this.modelData = await this.fetchModelData();
    },
    async fetchBrands() {
      return await this.currentProduct.fetchAvaibleBrands().then(mapAsOptions);
    },
    async fetchModels() {
      return await this.currentProduct.fetchAvaibleModels().then(mapAsOptions);
    },
    async fetchModelData() {
      return await this.currentProduct.fetchModelData();
    }
  },
  mounted() {
    this.fetchAll();
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.window-model-layout {
  position: absolute;
  left: 0;
  right: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    pointer-events: none;
    background-color: rgba($dark, 0.5);
    z-index: 1;
    transition: opacity $transition;
  }

  &.dimmed {
    &::before {
      opacity: 1;
      pointer-events: all;
    }
  }

  .not-desktop {
    position: unset;
  }
}
</style>
