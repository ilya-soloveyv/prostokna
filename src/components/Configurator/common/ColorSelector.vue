<template>
  <div
    class="color-selector"
    :class="{
      inverted: darkText,
      desktop: isDesktop,
      tablet: isTablet,
      mobile: isMobile
    }"
    :style="style"
    @click="toggle"
    ref="selector"
  >
    <label>{{ label }}</label>
    <transition name="options">
      <div
        class="palette"
        v-if="showOptions"
        :style="{
          minHeight: `${minHeight}px`,
          maxHeight: `${maxHeight}px`,
          top: `${top}px`
        }"
      >
        <div class="row">
          <div class="col-12">
            <div
              class="close-arrow"
              @click="() => setActive(null)"
              v-if="!isDesktop"
            >
              <img :src="arrowUp" />
            </div>
          </div>
          <div
            class="col-6"
            v-for="color of colors"
            :key="color.id"
            @click="() => select(color)"
          >
            <div
              class="color"
              :class="{
                inverted: color.darkText
              }"
              :style="{
                background: color.hex
              }"
            >
              {{ color.title }}
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="text">{{ title }}</div>
    <div class="arrow" />
  </div>
</template>

<script>
import arrowUp from '@images/configurator/arrow-up-md.png';

import '@/utils/resizeEndEvent.js';

export default {
  name: 'ColorSelector',
  props: {
    colors: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Выберете цвет'
    },
    label: {
      type: String,
      default: 'Цвет'
    },
    selected: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      top: 0,
      minHeight: 0,
      maxHeight: 0,
      showOptions: false,
      arrowUp
    };
  },
  computed: {
    isDesktop() {
      return ['xl'].includes(this.$mq);
    },
    isTablet() {
      return ['sm', 'md', 'lg'].includes(this.$mq);
    },
    isMobile() {
      return ['xs'].includes(this.$mq);
    },
    darkText() {
      return this.internalSelected ? !!this.internalSelected.darkText : false;
    },
    internalSelected() {
      return (
        this.colors.find(color => color.id === this.selected) ||
        this.colors.find(color => color.default === true) ||
        this.colors[0]
      );
    },
    title() {
      return this.internalSelected
        ? this.internalSelected.title
        : this.placeholder;
    },
    style() {
      const style = {};

      if (this.internalSelected) {
        style.backgroundColor = this.internalSelected.hex;
        style.borderColor = 'transparent';
      }

      if (this.internalSelected && this.internalSelected.texture) {
        style.backgroundImage = `url('${this.internalSelected.texture}')`;
      }

      return style;
    }
  },
  methods: {
    toggle() {
      if (this.showOptions) {
        this.close();
      } else {
        this.open();
      }
    },
    select(color) {
      this.$emit('change', color.id);
    },
    open() {
      const rect = this.$refs.selector.getBoundingClientRect();
      const parentRect = this.$refs.selector.parentNode.parentNode.getBoundingClientRect();

      this.top = parentRect.y - rect.y - 5;
      this.minHeight = parentRect.bottom - parentRect.top + 10;
      this.maxHeight = (window.innerHeight - parentRect.top - 20) / 2;

      this.showOptions = true;

      document.addEventListener('click', this.detectClickOutside);
    },
    close() {
      this.showOptions = false;
      document.removeEventListener('click', this.detectClickOutside);
    },
    onResize() {
      this.close();
      window.removeEventListener('resize', this.onResize);
    },
    addOnResizeListener() {
      window.addEventListener('resize', this.onResize);
    },
    detectClickOutside(e) {
      if (e.composedPath().indexOf(this.$refs.selector) === -1) {
        this.close();
      }
    }
  },
  mounted() {
    this.addOnResizeListener();
    window.addEventListener('resizeEnd', this.addOnResizeListener);
  },
  beforeDestroy() {
    window.removeEventListener('resizeEnd', this.addOnResizeListener);
    window.removeEventListener('resize', this.onResize);
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.color-selector {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100px;
  margin-bottom: 30px;
  padding: 55px 28px 14px;

  .mobile & {
    margin: 0 0 15px 0 !important;

    .arrow {
      bottom: 14px;
    }

    label {
      font-size: 11px;
      padding: 18px 28px 0;
    }

    & {
      height: auto;
      font-size: 13px;
      padding: 40px 28px 14px;
    }
  }

  &.tablet {
    padding: 47px 28px 14px;
    height: 90px;
  }

  background: $gray-darker;
  border: 1px solid;
  border-color: $border-dark;
  border-radius: 8px;
  color: $light !important;

  transition: border-color $transition;

  &.inverted {
    label,
    .text {
      color: $dark !important;
    }

    .arrow {
      background-image: url('@/images/configurator/arrow-down-dark.png');
    }
  }

  &:focus {
    border-color: rgba($light, 0.6);
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 22px 28px 0;
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
    color: rgba($light, 0.6);
  }

  .arrow {
    position: absolute;
    bottom: 22px;
    right: 28px;
    width: 12px;
    height: 8px;
    font-size: 16px;
    font-weight: 400;
    text-align: right;
    background-image: url('@/images/configurator/arrow-down.png');
  }

  .palette {
    background: $gray-darker;
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    padding: 40px 32px;
    overflow-x: hidden;
    overflow-y: scroll;
    border-radius: 10px;
    z-index: 10;

    .mobile & {
      position: fixed;
      top: 72px !important;
      left: 15px !important;
      right: 15px !important;
      max-height: calc(100vh - 80px - 15px) !important;
      min-height: auto !important;

      background: rgba($gray-800, 0.8);
      backdrop-filter: blur(5px);
    }

    &::-webkit-scrollbar {
      width: 5px;
      padding: 5px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $border-dark;
      border-radius: 1em;
    }
  }
}

.close-arrow {
  display: flex;
  justify-content: center;
  padding: 5px 0 40px;
}

.color {
  display: flex;
  height: 64px;
  margin: 0 -7.5px 15px;
  padding: 18px 28px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  transition: transform $transition, box-shadow $transition;
  cursor: pointer;

  &.inverted {
    color: $dark;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(#000, 0.25);
  }

  &:active {
    transform: scale(0.75);
  }
}

.options-enter-active {
  animation: showOptions $transition-time * 3;
}
.options-leave-active {
  animation: showOptions $transition-time * 1.5 reverse;
}

@keyframes showOptions {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
