<template>
  <div class="price-component">
    <div class="per-type" v-for="item of items" :key="item.name">
      {{ item.title }}
      <span class="price">{{ priceFormatter(item.price) }} ₽</span>
    </div>
    <div class="full">
      ОБЩАЯ СТОИМОСТЬ:
      <span class="price">{{ priceFormatter(fullPrice) }} ₽</span>
    </div>
  </div>
</template>

<script>
import priceFormatter from '@/utils/priceFormatter';

export default {
  name: 'Price',
  data() {
    return {
      items: [],
      priceFormatter: priceFormatter
    };
  },
  computed: {
    lastUpdate() {
      return this.currentProduct ? this.currentProduct.lastUpdate : Date.now();
    },
    currentProduct() {
      return this.$store.getters['configurator/currentProduct'];
    },
    avaibleTypes() {
      return this.$store.state.configurator.avaibleTypes;
    },
    fullPrice() {
      let price = 0;

      this.items.forEach(item => (price = price + item.price));

      return price;
    }
  },
  watch: {
    lastUpdate() {
      this.pricesByType();
    }
  },
  methods: {
    async pricesByType() {
      const table = [];

      for (const typeKey in this.avaibleTypes) {
        const type = this.avaibleTypes[typeKey];
        const productsForType = this.$store.getters[
          'configurator/getProductsByType'
        ](typeKey);
        let price = 0;

        for (const product of productsForType) {
          price = price + (await product.calculatePrice());
        }

        if (productsForType.length) {
          table.push({
            name: type.name,
            title: type.title,
            price
          });
        }
      }

      this.items = table;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.price-component {
  margin-bottom: 40px;
}

.per-type,
.full {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 500;
  height: 48px;
  padding: 0 26px;

  .price {
    font-weight: 600;
  }
}

.full {
  background: $gray-darker;
  border-radius: 8px;
}
</style>
