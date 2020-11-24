<template>
  <div class="ral-color">
    <label :for="id">
      Не нашли<br />
      нужного цвета?<br />
      Введите код цвета
    </label>
    <input
      type="text"
      placeholder="# RAL"
      :id="id"
      v-model="internalValue"
      @change="onChange"
    />
  </div>
</template>

<script>
export default {
  name: 'RalColorInput',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      id: null,
      internalValue: this.value
    };
  },
  methods: {
    onChange() {
      this.$emit('change', this.internalValue);
    }
  },
  mounted() {
    this.id = this._uid;
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.ral-color {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100px;

  .mobile & {
    flex-direction: column;
    height: auto;
  }
}

label {
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.29;
  color: $gray-lighter;

  .mobile & {
    width: 100%;
    padding: 0 28px 10px;
    font-size: 13px;

    br:first-child {
      display: none;
    }
  }
}

input {
  max-width: 50%;
  height: 4em;
  padding: 0 28px;
  background-color: $gray-800;
  border-radius: 50px;
  border: 1.5px solid;
  border-color: transparent;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  color: lighten($gray-lighter, 5);
  transition: border-color $transition;

  .mobile & {
    width: 100%;
    max-width: 100%;
    font-size: 13px;
    height: 3em;
  }

  &:focus {
    border-color: $border-dark;
    color: $light;
  }

  &::placeholder {
    color: $gray-lighter;
  }
}
</style>
