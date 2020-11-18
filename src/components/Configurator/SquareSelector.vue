<template>
  <div class="square-selector row">
    <div
      v-for="(option, index) of options"
      :key="index"
      :data-test="index"
      :class="{ selected: option.value === selected }"
      @click="() => select(option.value)"
      class="option col-4"
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
    flip: Boolean
  },
  data() {
    return {};
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

.option {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -15px;
  margin-bottom: 15px;
  padding-top: calc(100% / 3);
  position: relative;
  transition: transform 0.2s;

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
  }

  &.selected,
  &:hover {
    &::after {
      opacity: 1;
    }

    .option-body {
      background: transparent;
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
