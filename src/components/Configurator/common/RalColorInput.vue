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
}

label {
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.29;
  color: $gray-lighter;
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

  &:focus {
    border-color: $border-dark;
    color: $light;
  }

  &::placeholder {
    color: $gray-lighter;
  }
}
</style>
