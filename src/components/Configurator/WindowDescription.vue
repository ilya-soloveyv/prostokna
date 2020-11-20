<template>
  <div class="window-description" :class="{ mobile: !isDesktop }">
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
    <transition name="float-description-fade">
      <div
        class="content"
        :class="{ float: !['xl', 'lg'].includes($mq) }"
        v-if="isDesktop || (!isDesktop && active)"
      >
        <div
          class="close-arrow"
          @click="() => setActive(null)"
          v-if="!isDesktop"
        >
          <img :src="arrowUp" />
        </div>
        <transition name="fade">
          <div
            class="brand"
            v-if="active === 'brand'"
            v-html="brandDescription"
          ></div>
          <div class="parameters" v-if="active === 'parameters'">
            <div class="row">
              <div class="col-4 col-lg-6 col-xl-4">
                <CircleProgress
                  :value="8500"
                  :max="10000"
                  color="#d364e2"
                  text="ЦЕНА"
                />
              </div>

              <div class="col-4 col-lg-6 col-xl-4">
                <CircleProgress
                  :value="chartsData.insulation"
                  points="%"
                  text="ШУМОИЗОЛЯЦИЯ"
                />
              </div>

              <div class="col-4 col-lg-6 col-xl-4">
                <CircleProgress
                  :value="chartsData.safety"
                  points="%"
                  text="БЕЗОПАСНОСТЬ"
                />
              </div>

              <div class="col-4 col-lg-6 col-xl-4">
                <CircleProgress
                  :value="chartsData.aesthetics"
                  points="%"
                  text="ЭСТЕТИЧНОСТЬ"
                />
              </div>

              <div class="col-4 col-lg-6 col-xl-4">
                <CircleProgress
                  :value="chartsData.durability"
                  points="%"
                  text="НАДЕЖНОСТЬ"
                />
              </div>

              <div class="col-4 col-lg-6 col-xl-4">
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
    </transition>
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
import arrowUp from '@images/configurator/arrow-up-md.png';

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
      arrowUp,
      active: 'brand',
      modelData: {},
      brandDescription: '',
      mobileShow: false
    };
  },
  computed: {
    isDesktop() {
      return ['xl', 'lg'].includes(this.$mq);
    },
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
      if (!this.isDesktop) {
        setTimeout(() => {
          this.$emit('setBgDimm', this.active !== null);
        }, 0);
      }

      if (this.active === value) return (this.active = null);

      this.active = value;
    },
    onResizeEnd() {
      if (!this.isDesktop) {
        return this.setActive(null);
      }

      if (!this.active) this.active = 'brand';
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
    this.onResizeEnd();
    window.addEventListener('resizeEnd', this.onResizeEnd);
  },
  beforeDestroy() {
    window.removeEventListener('resizeEnd', this.onResizeEnd);
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

  &.float {
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    background: $dark;
    z-index: 5;
  }

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

.close-arrow {
  display: flex;
  justify-content: center;
  padding: 5px 0 40px;
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

.float-description-fade {
  &-enter-active {
    animation: description-fade $transition-time * 2 reverse;
  }
  &-leave-active {
    animation: description-fade $transition-time * 2;
  }
}

@keyframes description-fade {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.75) translateY(-50%);
  }
}
</style>
