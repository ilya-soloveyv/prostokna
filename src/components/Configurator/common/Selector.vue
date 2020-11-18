<template>
  <div
    class="selector"
    :class="{
      disabled: disabled,
      desktop: isDesktop,
      tablet: isTablet,
      mobile: isMobile
    }"
  >
    <label>{{ label }}</label>
    <select @change="onChange" :tabindex="disabled ? '-1' : '0'">
      <option
        v-for="option of options"
        :value="option.value"
        :key="option.value"
        :selected="option.value === selected"
      >
        {{ option.text }}
      </option>
    </select>
    <div class="arrow" />
  </div>
</template>

<script>
export default {
  name: 'Selector',
  props: {
    label: String,
    options: {
      type: Array,
      required: true
    },
    selected: [Number, String],
    disabled: Boolean
  },
  data: () => {
    return {};
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
    }
  },
  methods: {
    onChange(e) {
      if (this.disabled) return;

      this.$emit('change', e.currentTarget.value);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.selector {
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
    padding: 22px 28px 0;
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
    color: rgba($light, 0.6);
  }

  &.tablet select {
    padding: 47px 28px 14px;
  }

  select {
    padding: 55px 28px 14px;

    background: $gray-darker;
    border: 1px solid;
    border-color: $border-dark;
    border-radius: 8px;
    color: $light !important;

    transition: border-color $transition;

    outline: none !important;

    option {
      padding: 0;
    }

    appearance: none;
    -webkit-appearance: none;

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

  .arrow {
    position: absolute;
    bottom: 22px;
    right: 28px;
    width: 12px;
    height: 8px;
    font-size: 16px;
    font-weight: 400;
    text-align: right;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAICAYAAADN5B7xAAAAAXNSR0IArs4c6QAAAFpJREFUGBlj/P//vzUDBByF0rgoiDqghldA/A2InYCYAQcGyYHUvAIpgHFwaUKRh5mIIohkC4Y4TAM2mzAUgwxC1oCuCeREDGeia0DXBLIFRQ0j2BrMgMQZ1AC5ivkQzaTcsgAAAABJRU5ErkJggg==');
  }
}
</style>
