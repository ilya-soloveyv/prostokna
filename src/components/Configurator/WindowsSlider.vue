<template>
  <transition name="slide">
    <div class="windows-slider" v-if="products.length">
      <div v-for="product of products" :key="product.id">
        <transition name="slide">
          <div class="window" v-if="product === currentProduct">
            <div class="name">{{ name }}</div>
            <div class="price">{{ price }}₽</div>
            <div class="actions">
              <img v-bind:src="editIcon" class="action edit" />
              <img
                v-bind:src="deleteIcon"
                @click="() => removeProduct(product)"
                class="action delete"
              />
            </div>

            <div class="options">
              <div class="type">
                <img :src="shapeIcon" alt="" :style="shapeIconStyles" />
              </div>
              <div class="materials">
                <div
                  class="material"
                  v-if="frontFaceColor"
                  :style="frontFaceColorStyles"
                ></div>
                <div
                  class="material"
                  v-if="backFaceColor && currentProduct.paintingType === 2"
                  :style="backFaceColorStyles"
                ></div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="controls">
        <div class="prev" @click="prevProduct" />
        <div class="next" @click="nextProduct" />
        <div class="dots">
          <div
            class="dot"
            v-for="product of products"
            :class="{ selected: product.id === currentProductId }"
            :key="product.id"
            @click="() => selectProduct(product)"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/**
 * Utils
 */
import priceFormatter from '@/utils/priceFormatter';
/**
 * Icons
 */
import deleteIcon from '@images/configurator/delete-icon.svg';
import editIcon from '@images/configurator/edit-icon.svg';

export default {
  name: 'WindowsSlider',
  data() {
    return {
      deleteIcon,
      editIcon,
      productPrice: 0,
      name: '',
      frontFaceColor: null,
      backFaceColor: null,
      price: 0
    };
  },
  computed: {
    formatedPrice() {
      return priceFormatter(this.price);
    },
    lastUpdate() {
      return this.currentProduct ? this.currentProduct.lastUpdate : Date.now();
    },
    frontFaceColorStyles() {
      console.log(this.currentProduct.paintingType);
      return {
        background: 'initial',
        backgroundPosition: 'center',
        backgroundColor: this.frontFaceColor.hex || 'none',
        backgroundImage: this.frontFaceColor.texture
          ? `url('${this.frontFaceColor.texture}')`
          : 'none'
      };
    },
    backFaceColorStyles() {
      return {
        background: 'initial',
        backgroundPosition: 'center',
        backgroundColor: this.backFaceColor.hex || 'none',
        backgroundImage: this.backFaceColor.texture
          ? `url('${this.backFaceColor.texture}')`
          : 'none'
      };
    },
    shapeIconStyles() {
      return {
        transform: this.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
      };
    },
    products() {
      return this.$store.getters['configurator/productsWithCurrentType'];
    },
    currentProduct() {
      return this.$store.getters['configurator/currentProduct'];
    },
    currentProductId() {
      return this.$store.getters['configurator/currentProductId'];
    },
    shapeIcon() {
      return this.currentProduct.getSelectedShape().icon;
    },
    isFlipped() {
      return this.currentProduct.isFlipped;
    }
  },
  watch: {
    lastUpdate() {
      this.fetchSelectedColors();
      this.calcPrice();
      this.currentProduct.fetchModelData().then(data => {
        this.name = data.name;
      });
    }
  },
  methods: {
    async fetchSelectedColors() {
      if (!this.currentProduct) return;

      const avaibleColors = await this.currentProduct.fetchAvaibleColors();

      this.frontFaceColor = avaibleColors.frontFace.find(
        color => color.id === this.currentProduct.frontFaceColor
      );
      this.backFaceColor = avaibleColors.backFace.find(
        color => color.id === this.currentProduct.backFaceColor
      );
    },
    selectProduct(product) {
      this.$store.commit('configurator/setCurrentProduct', product);
    },
    removeProduct(product) {
      this.$store.dispatch('configurator/removeProduct', product);
    },
    prevProduct() {
      const selectedIndex = this.products.indexOf(this.currentProduct);
      const isFirst = selectedIndex === 0;

      if (!isFirst) {
        this.selectProduct(this.products[selectedIndex - 1]);
      } else {
        this.selectProduct(this.products[this.products.length - 1]);
      }
    },
    nextProduct() {
      const selectedIndex = this.products.indexOf(this.currentProduct);
      const isLast = selectedIndex === this.products.length - 1;

      if (!isLast) {
        this.selectProduct(this.products[selectedIndex + 1]);
      } else {
        this.selectProduct(this.products[0]);
      }
    },
    calcPrice() {
      this.currentProduct.calculatePrice().then(price => (this.price = price));
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.windows-slider {
  position: relative;
  background: $gray-darker;
  padding: 166px 26px 30px;
  margin-bottom: 14px;
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
  font-size: 14px;
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
  margin-top: 20px;
}

.type {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-color: $border-dark;
  background-color: $gray-600;

  img {
    max-width: 75%;
    max-height: 55%;
    transition: transform $transition;
  }
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

.controls {
  position: relative;

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
