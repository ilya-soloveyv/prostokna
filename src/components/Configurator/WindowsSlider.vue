<template>
  <transition name="slide">
    <div
      class="windows-slider"
      v-swiper:windowsSwiper="swiperOption"
      v-if="showSlider"
    >
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          :key="index"
          v-for="(product, index) of products"
        >
          <WindowsSlide :product="product" />
        </div>
      </div>
      <div class="controls">
        <div class="next" @click="windowsSwiper.slideNext()"></div>
        <div class="prev" @click="windowsSwiper.slidePrev()"></div>
        <div class="dots" ref="dots">
          <div
            class="dot"
            v-for="(product, index) of products"
            :key="index"
            :class="{ selected: product === currentProduct }"
            @click="() => slideTo(index)"
          ></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

import WindowsSlide from './WindowsSlide.vue';

export default {
  name: 'WindowsSlider',
  components: {
    Swiper,
    SwiperSlide,
    WindowsSlide
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      swiperOption: {
        init: false,
        loop: false,
        autoplay: false,
        on: {
          slideChange: ({ activeIndex }) => {
            this.selectProduct(this.products[activeIndex]);
          }
        }
      }
    };
  },
  watch: {
    showSlider() {
      this.showSlider ? this.initSwiper() : this.destroySwiper();
    }
  },
  computed: {
    products() {
      return this.$store.getters['configurator/productsWithCurrentType'];
    },
    showSlider() {
      return !!this.products.length;
    },
    currentProduct() {
      return this.$store.getters['configurator/currentProduct'];
    }
  },
  methods: {
    slideTo(index) {
      console.log(index);
      this.windowsSwiper.slideTo(index);
    },
    selectProduct(product) {
      this.$store.commit('configurator/setCurrentProduct', product);
    },

    initSwiper() {
      setTimeout(() => {
        this.windowsSwiper.init();
      }, 0);
    },
    destroySwiper() {
      setTimeout(() => {
        this.windowsSwiper.destroy();
      }, 0);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.windows-slider {
  position: relative;
  height: 200px;
  background: $gray-darker;
  margin-bottom: 14px;
  border-radius: 8px;
  overflow: hidden;

  .mobile & {
    height: 165px;
  }
}

.controls {
  position: absolute;
  bottom: 22px;
  left: 26px;
  right: 26px;
  height: 20px;
  z-index: 1;

  .mobile & {
    bottom: 10px;
  }

  .prev,
  .next {
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 20px;
    transform: rotate(180deg);
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAAAXNSR0IArs4c6QAAAH1JREFUKBWV01EKgDAIBmCpa3Sx6Ga9RkfpFJ0l7PdBGKJOBz8L5jdjbMTMG/IiF7IilEUWH0THjY8UCdiRTwXmFGn7o4oUyFxCIyghC6bIAymKQIgy4KFzoe7AcUZd3GNuFcvmHnB31j+xIC22HabFIygVK2hf7/YDaj3RH6h171WBt325AAAAAElFTkSuQmCC');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    opacity: 0.25;
    transition: opacity $transition;
    cursor: pointer;
    z-index: 5;

    &:hover {
      opacity: 1;
    }
  }

  .next {
    left: initial;
    right: 0;
    transform: none;
  }

  .dots {
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    left: 0;
    right: 0;
    top: 0;
    text-align: center;
  }

  .dot {
    position: relative;
    width: 5px;
    height: 5px;
    padding: 10px;
    margin: 0;
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
        background-color: $accent-2;
      }
    }

    &.selected {
      opacity: 1;
    }
  }
}

.slide {
  &-enter-active {
    animation: slide-in $transition-time * 3;
  }
  &-leave-active {
    animation: slide-in $transition-time * 3 reverse;
  }
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: scale(0);
    margin-top: calc(-100% + 40px);
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
