<template>
  <div class="windows-slider">
    <div class="window">
      <div class="name">MONTBLANC Eco</div>
      <div class="price">12 300 ₽</div>
      <div class="actions">
        <img v-bind:src="editIcon" class="action edit" />
        <img v-bind:src="deleteIcon" class="action delete" />
      </div>

      <div class="options">
        <div class="type">
          <img :src="wType07" alt="" srcset="" />
        </div>
        <div class="materials">
          <div class="material"></div>
          <div class="material"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import deleteIcon from '@images/configurator/delete-icon.svg';
import editIcon from '@images/configurator/edit-icon.svg';
import wType07 from '@images/configurator/window-type-7.svg';

export default {
  name: 'WindowsSlider',
  data() {
    return {
      deleteIcon,
      editIcon,
      wType07
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.windows-slider {
  position: relative;
  background: $gray-darker;
  padding: 30px 26px;
  margin-bottom: 14px;
  height: 200px;
  border-radius: 8px;
}

.window {
  position: absolute;
  top: 30px;
  bottom: 30px;
  left: 26px;
  right: 26px;
}

.name {
  font-size: 14px;
  margin-bottom: 8px;
}
.price {
  font-style: 14px;
  font-weight: 500;
}

.actions {
  position: absolute;
  top: -6px;
  right: -6px;
}

.action {
  padding: 6px;
  opacity: 0.75;
  transition: opacity $transition;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
}

.options {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}

.type {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-color: $border-dark;
  background-color: $gray-600;
}

.type,
.material {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  box-shadow: 2px 2px 2px rgba($dark, 0.15);
}

.material {
  background: $gradient;
  margin-left: 10px;
}

.materials {
  display: flex;
}
</style>
