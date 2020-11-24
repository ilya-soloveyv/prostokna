<template>
  <div class="type-bar">
    <div class="to-selected">
      ОТОБРАННОЕ
    </div>
    <TypeSelector />
  </div>
</template>

<script>
import TypeSelector from './TypeSelector.vue';

export default {
  name: 'MobileTypeBar',
  components: {
    TypeSelector
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.type-bar {
  position: fixed;
  z-index: 5;
  width: 100%;
  top: 60px;
  padding-top: 26px;

  background: linear-gradient(180deg, rgba($dark, 1) 0%, rgba(0, 0, 0, 0) 100%);
}

.to-selected {
  font-size: 8px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15px;
  margin-bottom: 15px;
}
</style>
