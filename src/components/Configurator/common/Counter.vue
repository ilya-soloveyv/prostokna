<template>
  <div class="counter" :class="{ disabled: disabled }">
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
    <div class="actions">
      <div class="decrease" @click="decrease">-</div>
      <div class="increase" @click="increase">+</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Counter',
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
      default: 10
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
      error: false
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
    increase() {
      this.internalValue = this.protectValue(this.internalValue + 1);
    },
    decrease() {
      this.internalValue = this.protectValue(this.internalValue - 1);
    },
    protectValue(value) {
      if (value > this.max) return this.max;
      if (value < this.min) return this.min;
      return Math.round(value);
    },
    onChange() {
      if (this.disabled) return;

      this.internalValue = this.safeValue;
      this.$emit('change', this.safeValue);
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

.counter {
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

  .actions {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 9px;
    display: flex;
    align-items: center;
  }

  .increase,
  .decrease {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    margin: 0 6px 0 0;
    border-radius: 4px;
    border: solid 0.2px;
    border-color: $border-dark;
    background-color: $dark;
    transition: border-color $transition, transform $transition;
    cursor: pointer;

    &:hover {
      border-color: rgba($light, 0.6);
    }

    &:active {
      transform: scale(0.75);
    }
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
}
</style>
