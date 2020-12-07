<template>
  <div class="row window-model-layout">
    <div class="col-12 col-lg-6">
      <CheckBox
        label="Подоконник"
        :checked="currentProduct.sill"
        @change="val => setProductOption('sill', val)"
        compact
      />
      <Slider
        label="ШИРИНА (ГЛУБИНА)"
        points="мм"
        :min="sillRanges.y[0]"
        :max="sillRanges.y[1]"
        :value="currentProduct.sillDepth"
        :disabled="!currentProduct.sill"
        @change="val => setProductOption('sillDepth', val)"
      />
      <Slider
        label="ДЛИНА"
        points="мм"
        :min="sillRanges.x[0]"
        :max="sillRanges.x[1]"
        :value="currentProduct.sillLength"
        :disabled="!currentProduct.sill"
        @change="val => setProductOption('sillLength', val)"
      />
      <CheckBox
        label="Обшивка парапета изнутри"
        :checked="currentProduct.parapetInner"
        @change="val => setProductOption('parapetInner', val)"
        compact
      />
      <CheckBox
        label="Обшивка парапета снаружи"
        :checked="currentProduct.parapetOuter"
        @change="val => setProductOption('parapetOuter', val)"
        compact
      />

      <Slider
        label="ОБШИВКА ПВХ-ПАНЕЛЯМИ"
        :value="currentProduct.pvcPanels"
        :max="15"
        :disabled="!currentProduct.parapetInner"
        @change="val => setProductOption('pvcPanels', val)"
        points="м²"
      />

      <Slider
        label="ОБШИВКА САЙДИНГОМ"
        points="м²"
        :max="15"
        :value="currentProduct.siding"
        :disabled="!currentProduct.parapetOuter"
        @change="val => setProductOption('siding', val)"
      />
    </div>
    <div class="col-12 col-lg-6">
      <div class="row">
        <div class="col-12 col-xl-6">
          <CheckBox
            label="Отлив стандартный 120 мм"
            :checked="currentProduct.outerSill"
            @change="val => setProductOption('outerSill', val)"
            compact
          />
        </div>
        <div class="col-12 col-xl-6">
          <CheckBox
            label="Козырек стандартный 450 мм"
            :checked="currentProduct.visor"
            @change="val => setProductOption('visor', val)"
            compact
          />
        </div>
      </div>
      <CheckBox
        label="Москитная сетка"
        :checked="currentProduct.mosquitoNet"
        @change="val => setProductOption('mosquitoNet', val)"
      />
      <Counter
        label="КОЛИЧЕСТВО СЕТОК"
        :min="1"
        :max="currentProduct.panesCount"
        :value="currentProduct.mosquitoNetCount"
        :disabled="!currentProduct.mosquitoNet"
        @change="val => setProductOption('mosquitoNetCount', val)"
      />
      <CheckBox
        label="Монтаж"
        :checked="$store.state.configurator.installation"
        @change="installationChange"
        compact
      />
      <CheckBox
        label="Есть лифт"
        :checked="!$store.state.configurator.liftingToFloor"
        @change="value => liftingToFloorChange(!value)"
        compact
      />
      <Slider
        label="ЭТАЖ"
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
import CheckBox from './common/CheckBox.vue';
import Selector from './common/Selector.vue';
import Slider from './common/Slider.vue';
import Counter from './common/Counter.vue';
import MobileNaigation from './common/MobileNaigation.vue';

/**
 * Utils
 */
import mapAsOptions from '@/utils/mapAsOptions';

export default {
  name: 'BalconyModelLayout',
  components: { Selector, Slider, CheckBox, Counter, MobileNaigation },
  inject: ['configuratorComponent'],
  data() {
    return {
      brands: [],
      models: [],
      modelData: {}
    };
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

    baseValues() {
      return this.$store.state.configurator.baseValues;
    },
    sillRanges() {
      return this.baseValues.windowSill;
    },

    currentProduct() {
      return this.$store.getters['configurator/currentProduct'];
    }
  },
  methods: {
    setProductOption(key, value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p[key] = value;
      });
    },

    installationChange(value) {
      this.$store.commit('configurator/setInstallation', value);
    },
    liftingToFloorChange(value) {
      this.$store.commit('configurator/setLifting', value);
    },
    floorChange(value) {
      this.$store.commit('configurator/setFloor', value);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.window-model-layout {
  position: absolute;
  left: 0;
  right: 0;
}
</style>
