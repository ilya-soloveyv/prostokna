<template>
  <div class="add-window" @click="addWindow">
    {{ label || selectedType.addNew }}
  </div>
</template>

<script>
export default {
  name: 'AddWindow',
  props: {
    label: String
  },
  computed: {
    selectedType() {
      const avaibleTypes = this.$store.state.configurator.avaibleTypes;
      const typeKey = this.$store.getters['configurator/selectedType'];
      return avaibleTypes[typeKey];
    }
  },
  methods: {
    addWindow() {
      this.$store.dispatch('configurator/addProduct');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.add-window {
  position: relative;
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 26px;
  margin-bottom: 14px;
  background-color: $gray-600;
  border: 0.5px dotted;
  border-color: $border-dark;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;

  &::after {
    content: '+';
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 6px;
    right: 12px;
    width: 22px;
    height: 22px;
    background-color: $gray-600;
    border: 0.5px dotted;
    border-color: $border-dark;
    border-radius: 22px;
    transition: transform $transition-cubic-1;
  }

  &:hover {
    &::after {
      transform: scale(1.25);
    }
  }
}
</style>
