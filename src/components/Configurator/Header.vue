<template>
  <div class="header">
    <div class="title">
      {{ title }}
    </div>
    <div
      class="prev"
      :class="{ disabled: !canGoBack }"
      @click="prev"
      v-if="!isMobile"
    />
    <div
      class="next"
      :class="{ disabled: !canGoForward }"
      @click="next"
      v-if="!isMobile"
    />
    <div class="dots" v-if="!isMobile">
      <div
        class="dot"
        :class="{ selected: currentScreen === screen }"
        :key="screen"
        @click="() => selectScreen(screen)"
        v-for="screen of avaibleScreens"
      />
    </div>
  </div>
</template>

<script>
import 'animate.css/source/fading_entrances/fadeIn.css';

export default {
  name: 'Header',
  data: () => {
    return {};
  },
  inject: ['configuratorComponent'],
  computed: {
    title() {
      const screens = this.currentTypeData.screensNames;
      const selectedScreen = screens[this.currentScreen.split('/')[1]];

      return selectedScreen;
    },
    isMobile() {
      return this.configuratorComponent.isMobile;
    },
    currentTypeData() {
      return this.configuratorComponent.currentTypeData;
    },
    currentScreen() {
      return this.configuratorComponent.currentScreen;
    },
    avaibleScreens() {
      return this.configuratorComponent.avaibleScreens;
    },
    currentIndex() {
      return this.configuratorComponent.currentIndex;
    },
    canGoForward() {
      return this.configuratorComponent.canGoForward;
    },
    canGoBack() {
      return this.configuratorComponent.canGoBack;
    },
    prev() {
      return this.configuratorComponent.prevScreen;
    },
    next() {
      return this.configuratorComponent.nextScreen;
    }
  },
  methods: {
    selectScreen(screenPath) {
      this.$store.commit('configurator/currentScreen', screenPath);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.header {
  position: relative;
  height: 64px;
  padding-bottom: 25px;
  margin-bottom: 28px;
  text-align: center;

  .mobile & {
    height: 22px;
    margin-bottom: 30px;
  }
}

.title {
  //position: absolute;
  //left: 0;
  //right: 0;
  font-size: 22px;
  font-weight: 500;
  padding: 2px 32px 5px;

  .mobile & {
    font-size: 13px;
    font-weight: 600;
  }
}

.prev,
.next {
  position: absolute;
  top: 0;
  left: 0;
  width: 22px;
  height: 33px;
  transform: rotate(180deg);
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAAAXNSR0IArs4c6QAAAH1JREFUKBWV01EKgDAIBmCpa3Sx6Ga9RkfpFJ0l7PdBGKJOBz8L5jdjbMTMG/IiF7IilEUWH0THjY8UCdiRTwXmFGn7o4oUyFxCIyghC6bIAymKQIgy4KFzoe7AcUZd3GNuFcvmHnB31j+xIC22HabFIygVK2hf7/YDaj3RH6h171WBt325AAAAAElFTkSuQmCC');
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.5;
  transition: opacity $transition;

  z-index: 10;

  &.disabled {
    pointer-events: none;
    opacity: 0.25 !important;
  }

  &:hover:not(.disabled) {
    opacity: 1;
    cursor: pointer;
  }
}

.next {
  left: initial;
  right: 0;
  transform: none;
}

.dots {
  // position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  // left: 0;
  // right: 0;
  // bottom: 0;
  text-align: center;
}

.dot {
  position: relative;
  width: 5px;
  height: 5px;
  padding: 10px;
  margin: 0 5px;
  opacity: 0.2;
  transition: opacity $transition;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    display: block;
    top: 7px;
    left: 7px;
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background-color: $border-dark;
  }

  &:hover,
  &.selected {
    opacity: 0.75;

    &::before {
      background-color: $accent-1;
    }
  }

  &.selected {
    opacity: 1;
  }
}

.change-header-enter-active {
  animation: fadeIn 0.5s;
}
.change-header-leave-active {
  animation: fadeIn 0.5s reverse;
}
</style>
