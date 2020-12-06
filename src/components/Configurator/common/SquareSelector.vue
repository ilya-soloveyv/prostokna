<template>
  <div class="square-selector row" :style="maxWidthStyle">
    <div
      v-for="(option, index) of options"
      :key="index"
      :data-test="index"
      :class="{ selected: option.value === selected, [optionColClass]: true }"
      :style="optionStyle"
      @click="() => select(option.value)"
      class="option"
    >
      <div class="option-body">
        <img :src="option.icon" alt="" />
        <div class="description" v-if="option.text">
          {{ option.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SquareSelector',
  props: {
    options: Array,
    selected: [Number, String],
    flip: Boolean,
    cols: {
      type: Number,
      default: 3
    },
    maxWidth: { type: [String], default: '' }
  },
  data() {
    return {};
  },
  computed: {
    maxWidthStyle() {
      if (!this.maxWidth) return {};
      return {
        maxWidth: this.maxWidth
      };
    },
    optionColClass() {
      return `col-${Math.round(12 / this.cols)}`;
    },
    optionStyle() {
      return {
        paddingTop: `calc(100% / ${this.cols})`
      };
    }
  },
  methods: {
    select(value) {
      this.$emit('change', value);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.square-selector {
  .mobile & {
    margin-right: -7.5px;
    margin-left: -7.5px;
  }
}

.option {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -15px;
  margin-bottom: 15px;
  padding-top: calc(100% / 3);
  position: relative;
  transition: transform 0.2s;

  .mobile & {
    margin-top: -7.5px;
    margin-bottom: 7.5px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    bottom: 15px;
    left: 15px;
    right: 15px;
    border-radius: 8px;
    background: $gradient;
    opacity: 0;
    transition: opacity $transition;
    z-index: 1;

    .mobile & {
      top: 7.5px;
      bottom: 7.5px;
      left: 7.5px;
      right: 7.5px;
    }
  }

  &:hover {
    &::after {
      opacity: 1;

      .mobile & {
        opacity: 0;
      }
    }

    .option-body {
      background: transparent;

      .mobile & {
        background: $gray-darker;
      }
    }
  }

  &.selected {
    &::after {
      opacity: 1 !important;
    }

    .option-body {
      background: transparent !important;
    }
  }

  &:active {
    transform: scale(0.8);
  }
}

.option-body {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 15px;
  bottom: 15px;
  left: 15px;
  right: 15px;
  border-radius: 8px;
  background: $gray-darker;
  color: $light !important;
  transition: background $transition;
  cursor: pointer;
  z-index: 2;

  .mobile & {
    top: 7.5px;
    bottom: 7.5px;
    left: 7.5px;
    right: 7.5px;
  }

  svg,
  img {
    max-width: 75%;
    max-height: 75%;

    transition: transform $transition;

    .flipped & {
      transform: rotateY(180deg);
    }
  }
}

.description {
  position: absolute;
  bottom: 10%;
  left: 0;
  right: 0;
  font-size: 10px;
  text-align: center;
  text-transform: uppercase;
}
</style>
