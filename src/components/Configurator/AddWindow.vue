<template>
  <div class="add-window">
    Добавить еще окно
  </div>
</template>

<script>
export default {
  name: 'AddWindow'
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
