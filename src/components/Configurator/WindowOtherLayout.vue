<template>
  <div class="row window-other-layout">
    <div class="col-12 col-lg-6">
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
        <div class="col-12 col-sm-6">
          <CheckBox
            label="Отлив"
            compact
            :checked="currentProduct.outerSill"
            @change="outerSill"
          />
        </div>
        <div class="col-12 col-sm-6">
          <CheckBox
            label="Монтаж"
            compact
            :checked="$store.state.configurator.installation"
            @change="installationChange"
          />
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-6">
      <div class="row">
        <div class="col-12 col-sm-6 col-lg-5">
          <CheckBox
            label="Откосы"
            compact
            :checked="currentProduct.slopes"
            @change="slopesChange"
          />
        </div>
        <div class="col-12 col-sm-6 col-lg-7">
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
        label="Есть лифт"
        :checked="!$store.state.configurator.liftingToFloor"
        @change="value => liftingToFloorChange(!value)"
      />
      <Slider
        label="ЭТАЖ"
        :max="100"
        :value="$store.state.configurator.floor"
        :disabled="!$store.state.configurator.liftingToFloor"
        @change="floorChange"
      />
    </div>
    <div class="col-12" v-if="isMobile">
      <MobileNaigation @prev="prevScreen" @next="nextScreen" />
    </div>
  </div>
</template>

<script>
/**
 * Components
 */
import Selector from './common/Selector.vue';
import Slider from './common/Slider.vue';
import CheckBox from './common/CheckBox.vue';
import MobileNaigation from './common/MobileNaigation.vue';

/**
 * Utils
 */
import mapAsOptions from '@/utils/mapAsOptions';

export default {
  name: 'WindowOtherLayout',
  components: { Selector, Slider, CheckBox, MobileNaigation },
  inject: ['configuratorComponent'],
  data() {
    return {};
  },
  computed: {
    prevScreen() {
      return this.configuratorComponent.prevScreen;
    },
    nextScreen() {
      return this.configuratorComponent.nextScreen;
    },
    isMobile() {
      return this.configuratorComponent.isMobile;
    },
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
    installationChange(value) {
      this.$store.commit('configurator/setInstallation', value);
    },
    liftingToFloorChange(value) {
      this.$store.commit('configurator/setLifting', value);
    },
    floorChange(value) {
      this.$store.commit('configurator/setFloor', value);
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
    outerSill(value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.outerSill = value;
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
