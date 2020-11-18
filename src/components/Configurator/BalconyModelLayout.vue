<template>
  <div class="row window-model-layout">
    <div class="col-6">
      <Selector
        label="ПРОИЗВОДИТЕЛЬ"
        :options="brands"
        :selected="brandId"
        @change="selectBrand"
      />
      <Selector
        label="СТЕКЛОПАКЕТ"
        :options="glazings"
        :selected="currentProduct.glazing"
        @change="setGlazing"
      />
    </div>
    <div class="col-6">
      <WindowDescription />
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
      modelData: {}
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
    setProfile(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.profile = parseInt(value);
      });
    },
    setGlazing(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.glazing = parseInt(value);
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
.window-model-layout {
  position: absolute;
  left: 0;
  right: 0;
}
</style>
