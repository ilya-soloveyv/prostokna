<template>
  <div class="window">
    <div class="name">{{ name }}</div>
    <div class="price">{{ price }}₽</div>
    <div class="actions">
      <img
        v-bind:src="editIcon"
        @click="() => configuratorComponent.$emit('editProduct')"
        v-if="configuratorComponent.isMobile"
        class="action delete"
      />
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
          v-if="backFaceColor && product.paintingType === 2"
          :style="backFaceColorStyles"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import priceFormatter from '@/utils/priceFormatter';
import deleteIcon from '@images/configurator/delete-icon.svg';
import editIcon from '@images/configurator/edit-icon.svg';

export default {
  name: 'ProductsSlide',
  props: {
    product: { required: true }
  },
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
  inject: ['configuratorComponent'],
  computed: {
    formatedPrice() {
      return priceFormatter(this.price);
    },
    lastUpdate() {
      return this.product.lastUpdate;
    },
    frontFaceColorStyles() {
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
    shapeIcon() {
      return this.product.getSelectedShape().icon;
    },
    isFlipped() {
      return this.product.isFlipped;
    }
  },
  watch: {
    lastUpdate() {
      this.fetchAll();
    }
  },
  methods: {
    async fetchSelectedColors() {
      const avaibleColors = await this.product.fetchAvaibleColors();

      this.frontFaceColor = avaibleColors.frontFace.find(
        color => color.id === this.product.frontFaceColor
      );
      this.backFaceColor = avaibleColors.backFace.find(
        color => color.id === this.product.backFaceColor
      );
    },
    removeProduct(product) {
      if (window.confirm('Удалить?')) {
        this.$store.dispatch('configurator/removeProduct', product);
      }
    },
    calcPrice() {
      try {
        this.product.calculatePrice().then(price => (this.price = price));
      } catch (error) {
        this.price = 1000;
      }
    },
    fetchAll() {
      this.fetchSelectedColors();
      this.calcPrice();
      this.product.fetchModelData().then(data => {
        this.name = data.name;
      });
    }
  },
  mounted() {
    this.fetchAll();
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';
.window {
  position: absolute;
  top: 30px;
  bottom: 30px;
  left: 26px;
  right: 26px;

  .mobile & {
    top: 15px;
    bottom: 15px;
  }
}

.name {
  font-size: 14px;
  margin-bottom: 8px;

  .mobile & {
    margin-bottom: 4px;
  }
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

  .mobile & {
    margin-top: 10px;
  }
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
</style>
