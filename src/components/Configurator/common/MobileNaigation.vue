<template>
  <div class="mobile-navigation">
    <div class="row">
      <div class="col-6" :style="{ paddingRight: '7.5px' }">
        <div class="prev" v-if="canGoBack" @click="$emit('prev')">
          {{ backText }}
        </div>
      </div>
      <div class="col-6" :style="{ paddingLeft: '7.5px' }">
        <div class="next" v-if="canGoForward" @click="$emit('next')">
          {{ nextText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileNaigation',
  props: {
    canGoBack: {
      type: Boolean,
      default: true
    },
    canGoForward: {
      type: Boolean,
      default: true
    },
    backText: { type: String, default: 'НАЗАД' },
    nextText: { type: String, default: 'ДАЛЕЕ' }
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.mobile-navigation {
  margin: 30px 0;
}

.prev,
.next {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35px;
  border-radius: 35px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0);
  border: solid 1px;
  border-color: transparent;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 8px;
    background-image: url('@/images/configurator/arrow-right.png');
    background-position: center;
    background-repeat: no-repeat;
  }
}

.prev {
  background-color: $gray-600;
  &::after {
    transform: rotate(180deg);
    left: 12px;
    padding-left: 6px;
  }
}

.next {
  border-color: $border-dark;
  &::after {
    right: 12px;
    padding-right: 6px;
  }
}
</style>
