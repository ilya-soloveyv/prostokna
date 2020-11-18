<template>
  <div
    class="slider"
    :class="{
      disabled: disabled,
      desktop: isDesktop,
      tablet: isTablet,
      mobile: isMobile
    }"
  >
    <label>{{ label }}</label>
    <input
      type="number"
      class="value"
      v-bind:placeholder="placeholder"
      v-model="internalValue"
      @change="onChange"
      :tabindex="disabled ? '-1' : '0'"
    />
    <div class="points" v-if="points">{{ points }}</div>
    <div class="slider__progress" ref="progress">
      <div class="line" v-bind:style="lineStyle">
        <div
          class="pointer"
          v-on:mousedown="onPointerPress"
          v-on:touchstart="onPointerPress"
        />
      </div>
    </div>
  </div>
</template>

<script>
const getEventСoordinates = event => {
  const isMouseEvent = event instanceof MouseEvent;
  const coordinates = { x: null, y: null };

  if (isMouseEvent) {
    coordinates.x = event.clientX;
    coordinates.y = event.clientY;
  } else {
    let touch = event.targetTouches[0];

    coordinates.x = touch.pageX;
    coordinates.y = touch.pageY;
  }

  return coordinates;
};

export default {
  name: 'Slider',
  props: {
    label: {
      type: String,
      required: true
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      default: 0
    },
    points: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: 'Введите значение'
    },
    disabled: Boolean
  },
  data: () => {
    return {
      internalValue: 0,
      error: false,
      progressWidth: 0,
      initialСoordinates: { x: 0, y: 0 },
      valueAtShiftStart: 0,
      isTouchEvent: false
    };
  },
  watch: {
    value(value) {
      this._value = value;
    },
    thresholdsSum() {
      this.internalValue = this.safeValue;
      this.$emit('change', this.safeValue);
    }
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
    thresholdsSum() {
      return this.min + this.max;
    },
    lineStyle() {
      return {
        width: `${this.percent}%`
      };
    },
    safeValue() {
      return this.protectValue(this.internalValue);
    },
    percent() {
      return (
        (100 / (this.max - this.min)) * parseInt(this.safeValue - this.min)
      );
    },
    onePercentInPoints() {
      return (this.max - this.min) / 100;
    }
  },
  methods: {
    protectValue(value) {
      if (value > this.max) return this.max;
      if (value < this.min) return this.min;
      return Math.round(value);
    },
    onChange() {
      if (this.disabled) return;

      this.internalValue = this.safeValue;
      this.$emit('change', this.safeValue);
    },
    setProgressWidth() {
      this.progressWidth = this.$refs.progress.offsetWidth;
    },
    onPointerPress(e) {
      if (this.disabled) return;

      const isMouseEvent = e instanceof MouseEvent;
      const coordinates = getEventСoordinates(e);

      this.setProgressWidth();
      this.initialСoordinates.x = coordinates.x;
      this.initialСoordinates.y = coordinates.y;
      this.valueAtShiftStart = this.safeValue;

      window.addEventListener(
        isMouseEvent ? 'mousemove' : 'touchmove',
        this.onSlide
      );
      window.addEventListener(
        isMouseEvent ? 'mouseup' : 'touchend',
        this.onRelease
      );
    },
    onSlide(e) {
      if (this.disabled) return;

      const coordinates = getEventСoordinates(e);

      const shiftX = coordinates.x - this.initialСoordinates.x;
      const shiftY = coordinates.y - this.initialСoordinates.y;

      const horisontalShiftPoints =
        (100 / this.progressWidth) * shiftX * this.onePercentInPoints;

      this.internalValue = this.protectValue(
        this.valueAtShiftStart + Math.round(horisontalShiftPoints)
      );
    },
    onRelease(e) {
      const isMouseEvent = e instanceof MouseEvent;

      this.$emit('change', this.safeValue);

      window.removeEventListener(
        isMouseEvent ? 'mousemove' : 'touchmove',
        this.onSlide
      );
      window.removeEventListener(
        isMouseEvent ? 'mouseup' : 'touchend',
        this.onRelease
      );
    }
  },
  mounted() {
    this.internalValue = this.protectValue(this.value);
    this.$emit('change', this.protectValue(this.value));
  },
  beforeUpdate() {
    this.$emit('change', this.safeValue);
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.slider {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  transition: opacity $transition;

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }

  label {
    position: absolute;
    margin-bottom: 34px;
    padding: 22px 0 0 28px;
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
    color: rgba($light, 0.6);
  }

  &.tablet input {
    padding: 47px 28px 14px;
  }

  input {
    padding: 55px 28px 14px;

    background: $gray-darker;
    border: 1px solid;
    border-color: $border-dark;
    border-radius: 8px;
    color: $light !important;

    transition: border-color $transition;

    outline: none !important;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }

    &,
    &::placeholder {
      font-size: 18px;
      font-weight: 400;
      color: $light;
    }

    &::placeholder {
      color: $border-dark;
    }

    &:focus {
      border-color: rgba($light, 0.6);
    }
  }

  .points {
    position: absolute;
    bottom: 16px;
    right: 28px;
    font-size: 16px;
    font-weight: 400;
    text-align: right;
  }

  &__progress {
    position: absolute;
    bottom: -1px;
    left: 22px;
    right: 22px;

    .line {
      position: relative;
      width: 100%;
      height: 2px;
      background-color: $accent-2;
    }

    .pointer {
      position: absolute;
      width: 18px;
      height: 18px;
      top: -9px;
      right: -9px;
      border: 1px solid;
      border-color: $accent-2;
      border-radius: 100%;
      background-color: $dark;
      transition: transform $transition;

      &::after {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 10px;
        height: 10px;
        border-radius: 100%;
        background-color: $accent-2;
      }

      &:hover {
        transform: scale(1.25);
        cursor: col-resize;
      }
    }
  }
}
</style>
