<template>
  <div class="type-selector" ref="self" :class="{ compact: !isDesktop }">
    <div
      class="option"
      v-for="(type, key) in avaibleTypes"
      v-bind:class="{
        selected: key === selectedType
      }"
      v-bind:key="key"
      v-on:click="() => select(key)"
    >
      <img :src="type.icon" alt="" />

      <div class="badge">{{ getProductCountByType(key) }}</div>
    </div>
    <div class="backplate" v-bind:style="backplateStyle" />
  </div>
</template>

<script>
import '@/utils/resizeEndEvent.js';

export default {
  name: 'TypeSelector',
  inject: ['configuratorComponent'],
  data: () => {
    return {
      optionsElements: [],
      backplateStyle: {},
      _element: null
    };
  },
  computed: {
    isDesktop() {
      return this.configuratorComponent.isDesktop;
    },
    isMobile() {
      return this.configuratorComponent.isMobile;
    },
    avaibleTypes() {
      return this.$store.state.configurator.avaibleTypes;
    },
    selectedType() {
      return this.$store.getters['configurator/selectedType'];
    }
  },
  watch: {
    selectedType() {
      this.calculateBackplateStyle();
    }
  },
  methods: {
    select(selectedType) {
      if (this.isMobile) this.configuratorComponent.mobileLayout = 'summary';
      this.$store.commit('configurator/selectType', selectedType);
    },
    getProductCountByType(type) {
      return this.$store.getters['configurator/getProductCountByType'](type);
    },
    calculateBackplateStyle() {
      setTimeout(() => {
        const types = Object.keys(this.avaibleTypes);
        const currentIndex = types.indexOf(this.selectedType);
        const optionsRect = this._element.getBoundingClientRect();
        const selectedRect = this.optionsElements[
          currentIndex
        ].getBoundingClientRect();
        const width = optionsRect.width;
        const left = (optionsRect.left - selectedRect.left) * -1;
        const right = (selectedRect.right - optionsRect.right) * -1;

        this.backplateStyle = {
          left: `calc(${left}px + 5px)`,
          right: `calc(${right}px + 5px)`
        };
      }, 0);
    }
  },
  mounted() {
    window.addEventListener('resizeEnd', this.calculateBackplateStyle);
    this._element = this.$refs.self;
    this.optionsElements = this.$refs.self.querySelectorAll('.option');
    this.calculateBackplateStyle();
  },
  beforeDestroy() {
    window.removeEventListener('resizeEnd', this.calculateBackplateStyle);
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.type-selector {
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  height: 50px;
  margin-bottom: 40px;
  border-radius: 50px;
  background-color: $gray-600;

  &.compact {
    max-width: 75%;
    height: 35px;
    margin: 0 auto 25px;
  }
}

.price {
  width: 0;
  margin-left: 10px;
  opacity: 0;
  overflow: hidden;
  font-size: 14px;
  transition: width $transition, opacity $transition;
}

.selected .price {
  width: auto;
  opacity: 1;
}

.option {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 0 5px;
  z-index: 1;
  cursor: pointer;

  svg,
  img {
    max-width: 25px;
    opacity: 0.5;
    transition: opacity $transition;

    .compact & {
      max-height: 15px;
    }
  }

  &.selected,
  &:hover {
    svg,
    img {
      opacity: 1;
    }
  }
}

.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 14px;
  margin-left: 10px;
  padding: 0 8px;
  font-size: 9px;
  border: 1px solid;
  border-color: rgba($light, 0.5);
  border-radius: 14px;
  transition: background-color $transition;

  .option.selected & {
    border-color: $accent-1;
    background-color: $accent-1;
  }
}

.backplate {
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  right: 5px;
  border-radius: 40px;
  background-color: $dark;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  transition: left $transition, right $transition;
}
</style>
