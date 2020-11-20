<template>
  <div class="row window-color-layout">
    <div class="col-12 col-lg-6">
      <Selector
        label="ТИП ПОКРАСКИ"
        :options="paintingTypes"
        :selected="paintingType"
        @change="selectPaintingType"
      />
      <ColorSelector
        label="ЦВЕТ ПОКРАСКИ ЛИЦЕВОЙ СТОРОНЫ"
        v-if="paintingType === 2"
        :colors="frontFace"
        :selected="currentProduct.frontFaceColor"
        @change="setFrontFaceColor"
      />
      <div class="row">
        <div class="col-5">
          <CheckBox
            label="Цветные откосы"
            :checked="currentProduct.coloredSlopes"
            @change="setColoredSlopes"
          />
        </div>
        <div class="col-7">
          <CheckBox
            label="Цветной подоконник"
            :checked="currentProduct.coloredSill"
            @change="setColoredSill"
          />
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-6">
      <ColorSelector
        label="ЦВЕТ УПЛОТНИТЕЛЯ"
        :colors="seal"
        :selected="currentProduct.sealColor"
        @change="setSealColor"
      />
      <ColorSelector
        label="ЦВЕТ ПОКРАСКИ ЛИЦЕВОЙ СТОРОНЫ"
        v-if="paintingType !== 2"
        :colors="frontFace"
        :selected="currentProduct.frontFaceColor"
        @change="setFrontFaceColor"
      />
      <ColorSelector
        label="ЦВЕТ ПОКРАСКИ ОБРАТНОЙ СТОРОНЫ"
        v-if="paintingType === 2"
        :colors="backFace"
        :selected="currentProduct.backFaceColor"
        @change="setBackFaceColor"
      />
      <RalColorInput :value="currentProduct.ralColor" @change="setRalColor" />
    </div>
  </div>
</template>

<script>
import Selector from './common/Selector.vue';
import ColorSelector from './common/ColorSelector.vue';
import Slider from './common/Slider.vue';
import CheckBox from './common/CheckBox.vue';
import RalColorInput from './common/RalColorInput.vue';

import mapAsOptions from '@/utils/mapAsOptions';

export default {
  name: 'WindowColorLayout',
  components: { Selector, Slider, CheckBox, ColorSelector, RalColorInput },
  data() {
    return {
      paintingTypes: [
        { value: 1, text: 'Односторонняя' },
        { value: 2, text: 'Двусторонняя' }
      ],
      colorData: {}
    };
  },
  computed: {
    currentProduct() {
      return this.$store.getters['configurator/currentProduct'];
    },
    lastUpdate() {
      return this.currentProduct.lastUpdate;
    },
    paintingType() {
      return this.currentProduct.paintingType;
    },
    frontFace() {
      return this.colorData.frontFace || [];
    },
    backFace() {
      return this.colorData.backFace || [];
    },
    seal() {
      return this.colorData.seal || [];
    }
  },
  watch: {
    lastUpdate() {
      this.fetchColors();
    }
  },
  methods: {
    setRalColor(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.ralColor = value;
      });
    },
    setColoredSlopes(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.coloredSlopes = value;
      });
    },
    setColoredSill(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.coloredSill = value;
      });
    },
    setSealColor(colorId) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.sealColor = colorId;
      });
    },
    setFrontFaceColor(colorId) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.frontFaceColor = colorId;
      });
    },
    setBackFaceColor(colorId) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.backFaceColor = colorId;
      });
    },

    selectPaintingType(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.paintingType = parseInt(value);
      });
    },
    async fetchColors() {
      this.colorData = await this.currentProduct.fetchAvaibleColors();
    }
  },
  mounted() {
    this.fetchColors();
  }
};
</script>

<style lang="scss" scoped>
.window-color-layout {
  position: absolute;
  left: 0;
  right: 0;
}
</style>
