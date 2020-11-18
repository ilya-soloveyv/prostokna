<template>
  <div class="row window-other-layout">
    <div class="col-6">
      <CheckBox
        label="Подоконник"
        compact
        :checked="currentProduct.windowSill"
        @change="windowSillChange"
      />
      <Slider
        label="ШИРИНА (ГЛУБИНА)"
        :min="windowSillRanges.y[0]"
        :max="windowSillRanges.y[1]"
        :value="currentProduct.sillDepth"
        :disabled="!currentProduct.windowSill"
        @change="sillDepthChange"
      />
      <Slider
        label="ДЛИНА"
        :min="windowSillRanges.x[0]"
        :max="windowSillRanges.x[1]"
        :value="currentProduct.sillLength"
        :disabled="!currentProduct.windowSill"
        @change="sillLengthChange"
      />
      <Selector
        label="ПРОИЗВОДИТЕЛЬ"
        :options="sillsBrands"
        :disabled="!currentProduct.windowSill"
        :selected="currentProduct.sillBrand"
        @change="sillBrandChange"
      />
      <div class="row">
        <div class="col-6">
          <CheckBox
            label="Отлив"
            compact
            :checked="currentProduct.sillCasting"
            :disabled="!currentProduct.windowSill"
            @change="sillCastingChange"
          />
        </div>
        <div class="col-6">
          <CheckBox
            label="Монтаж"
            compact
            :checked="currentProduct.sillMounting"
            :disabled="!currentProduct.windowSill"
            @change="sillMountingChange"
          />
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="row">
        <div class="col-5">
          <CheckBox
            label="Откосы"
            compact
            :checked="currentProduct.slopes"
            @change="slopesChange"
          />
        </div>
        <div class="col-7">
          <CheckBox
            label="Детский замок"
            compact
            :checked="currentProduct.childLock"
            @change="childLockChange"
          />
        </div>
      </div>
      <Slider
        label="ГЛУБИНА ОТКОСОВ"
        :min="slopesDepthRange[0]"
        :max="slopesDepthRange[1]"
        :value="currentProduct.slopesDepth"
        :disabled="!currentProduct.slopes"
        @change="slopesDepthChange"
      />
      <CheckBox
        label="Подъем на этаж"
        :checked="currentProduct.liftingToFloor"
        @change="liftingToFloorChange"
      />
      <Selector
        label="ЭТАЖ"
        :options="avaibleFloors"
        :disabled="!currentProduct.liftingToFloor"
        :selected="currentProduct.floor"
        @change="floorChange"
      />
    </div>
  </div>
</template>

<script>
/**
 * Components
 */
import Selector from './Selector.vue';
import Slider from './Slider.vue';
import CheckBox from './CheckBox.vue';

/**
 * Utils
 */
import mapAsOptions from '@/utils/mapAsOptions';

export default {
  name: 'WindowOtherLayout',
  components: { Selector, Slider, CheckBox },
  data() {
    return {
      testOptions: [{ value: 123, text: 'text' }]
    };
  },
  computed: {
    currentProduct() {
      return this.$store.getters['configurator/currentProduct'];
    },
    ranges() {
      return this.$store.state.configurator.ranges;
    },
    windowSillRanges() {
      return this.ranges.windowSill;
    },
    slopesDepthRange() {
      return this.ranges.slopesDepth;
    },
    sillsBrands() {
      return mapAsOptions(this.ranges.sillsBrands);
    },
    avaibleFloors() {
      return mapAsOptions(this.ranges.avaibleFloors);
    }
  },
  methods: {
    floorChange(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.floor = parseInt(value);
      });
    },
    sillBrandChange(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.sillBrand = parseInt(value);
      });
    },
    windowSillChange(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.windowSill = value;
      });
    },
    liftingToFloorChange(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.liftingToFloor = value;
      });
    },
    slopesDepthChange(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.slopesDepth = value;
      });
    },
    childLockChange(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.childLock = value;
      });
    },
    slopesChange(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.slopes = value;
      });
    },
    sillDepthChange(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.sillDepth = value;
      });
    },
    sillLengthChange(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.sillLength = value;
      });
    },
    sillCastingChange(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.sillCasting = value;
      });
    },
    sillMountingChange(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.sillMounting = value;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.window-other-layout {
  position: absolute;
  left: 0;
  right: 0;
}
</style>
