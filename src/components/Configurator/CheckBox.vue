<template>
  <div
    class="checkbox"
    :class="{ compact: compact, paragraph: paragraph, disabled: disabled }"
  >
    <input type="checkbox" :id="id" v-model="isChecked" />
    <label :for="id" v-if="label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',
  props: {
    label: String,
    compact: {
      type: Boolean
    },
    paragraph: {
      type: Boolean
    },
    checked: {
      type: Boolean
    },
    disabled: Boolean
  },
  data() {
    return {
      id: null,
      isChecked: this.checked
    };
  },
  watch: {
    isChecked() {
      if (this.disabled) return;
      this.$emit('change', this.isChecked);
    }
  },
  mounted() {
    this.id = this._uid;
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.checkbox {
  display: flex;
  align-items: center;
  height: 100px;
  padding-top: 10px;
  margin-bottom: 30px;
  font-size: 14px;
  font-weight: 500;
  color: $gray-lighter;
  transition: opacity $transition;

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }

  &:hover label {
    color: lighten($gray-lighter, 20%);
  }

  &.compact {
    height: 100px;
    margin-top: -15px;
    margin-bottom: 0;
    padding-top: 2px !important;
  }

  &.paragraph {
    padding-left: 28px;
  }
}

input {
  width: 0;
  height: 0;
  opacity: 0;

  &:focus ~ label {
    color: lighten($gray-lighter, 20%);
  }

  & ~ label {
    position: relative;
    padding-left: 48px;
    color: $gray-lighter;
    transition: color $transition;
    cursor: pointer;

    &::before,
    &::after {
      content: '';
      position: absolute;
      display: block;
      left: 0;
      top: -1.5px;
      width: 25px;
      height: 25px;
    }

    &::before {
      background-color: #2c2c2c;
    }

    &::after {
      opacity: 0;
      transform: scale(0);
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNi43MDUiIGhlaWdodD0iMTEuNzA3IiB2aWV3Qm94PSIwIDAgMTYuNzA1IDExLjcwNyI+CiAgPHBhdGggaWQ9IlBhdGhfMjI4ODkiIGRhdGEtbmFtZT0iUGF0aCAyMjg4OSIgZD0iTTE0NDA1Ljg0Ny00MjIwLjc2NWw1LjMxOSw1LjMxMSw4LjU1Ny04Ljg2NyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE0NDA0LjQzMiA0MjI1LjczNSkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzgyZGNlZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg==');
      background-repeat: no-repeat;
      background-position: center;
      transition: opacity $transition, transform $transition-cubic-1;
    }
  }

  &:checked ~ label::after {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
