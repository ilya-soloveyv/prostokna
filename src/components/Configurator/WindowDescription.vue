<template>
  <div class="window-description">
    <div class="tabs">
      <div
        class="tab"
        :class="{ selected: active === 'brand' }"
        @click="() => setActive('brand')"
      >
        <div class="icon">
          <img :src="aboutBrand" alt="" />
        </div>
        <span>О бренде</span>
      </div>
      <div
        class="tab"
        :class="{ selected: active === 'parameters' }"
        @click="() => setActive('parameters')"
      >
        <div class="icon">
          <img :src="parametersChart" alt="" />
        </div>
        <span>Характеристики</span>
      </div>
      <div
        class="tab"
        :class="{ selected: active === 'description' }"
        @click="() => setActive('description')"
      >
        <div class="icon">
          <img :src="productDescription" alt="" />
        </div>
        <span>Описание</span>
      </div>
    </div>
    <div class="content">
      <transition name="fade">
        <div
          class="brand"
          v-if="active === 'brand'"
          v-html="brandDescription"
        ></div>
        <div class="parameters" v-if="active === 'parameters'">
          <div class="row">
            <div class="col-4">
              <CircleProgress
                :value="8500"
                :max="10000"
                color="#d364e2"
                text="ЦЕНА"
              />
            </div>

            <div class="col-4">
              <CircleProgress
                :value="chartsData.insulation"
                points="%"
                text="ШУМОИЗОЛЯЦИЯ"
              />
            </div>

            <div class="col-4">
              <CircleProgress
                :value="chartsData.safety"
                points="%"
                text="БЕЗОПАСНОСТЬ"
              />
            </div>

            <div class="col-4">
              <CircleProgress
                :value="chartsData.aesthetics"
                points="%"
                text="ЭСТЕТИЧНОСТЬ"
              />
            </div>

            <div class="col-4">
              <CircleProgress
                :value="chartsData.durability"
                points="%"
                text="НАДЕЖНОСТЬ"
              />
            </div>

            <div class="col-4">
              <CircleProgress
                :value="chartsData.ecology"
                points="%"
                text="ЭКОЛОГИЧНОСТЬ"
              />
            </div>
          </div>
        </div>
        <div class="description" v-if="active === 'description'">
          {{ modelData.description }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
/**
 * Components
 */
import CircleProgress from './common/CircleProgress.vue';

/**
 * Icons
 */
import aboutBrand from '@images/configurator/about-brand.svg';
import parametersChart from '@images/configurator/parameters-chart.svg';
import productDescription from '@images/configurator/product-description.svg';

/**
 * Styles
 */
import 'animate.css/source/fading_entrances/fadeIn.css';

export default {
  name: 'WindowDescription',
  components: {
    CircleProgress
  },
  data() {
    return {
      aboutBrand,
      parametersChart,
      productDescription,
      active: 'brand',
      modelData: {},
      brandDescription: ''
    };
  },
  computed: {
    currentProduct() {
      return this.$store.getters['configurator/currentProduct'];
    },
    lastUpdate() {
      return this.currentProduct.lastUpdate;
    },
    chartsData() {
      return this.modelData.charts;
    }
  },
  watch: {
    lastUpdate() {
      this.getModelData();
      this.getBrands();
    }
  },
  methods: {
    setActive(value) {
      this.active = value;
    },
    async getBrands() {
      const brandId = this.currentProduct.brandId;
      this.brandDescription = await this.currentProduct
        .fetchAvaibleBrands()
        .then(brands => brands.find(brand => brand.id === brandId))
        .then(brand => brand.description);
    },
    async getModelData() {
      this.modelData = await this.currentProduct.fetchModelData();
    }
  },
  mounted() {
    this.getModelData();
    this.getBrands();
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.content {
  padding: 22px 28px;
  border-radius: 8px;
  border: solid 1px $border-dark;
  font-size: 14px;
  line-height: 1.5;

  & ::v-deep p {
    margin-bottom: 2em;
  }

  & ::v-deep ul {
    font-weight: 300;
    li {
      position: relative;
      padding-left: 20px;
      margin-bottom: 0.5em;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.65em;
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background-color: $light;
      }
    }
  }
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 33px;
}

.tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 13px;
  cursor: pointer;

  span {
    opacity: 0.6;
  }

  &.selected,
  &:hover {
    span {
      opacity: 1;
    }
  }

  &.selected {
    .icon {
      background-color: $gray-600;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    }
  }
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 87px;
  height: 35px;
  margin-bottom: 11px;
  border-radius: 35px;
  border: solid 1px $border-dark;
}

.fade {
  &-enter-active {
    animation: fadeIn $transition-time * 3;
  }
  &-leave-active {
    animation: fadeIn $transition-time * 3 reverse;
  }
}
</style>
