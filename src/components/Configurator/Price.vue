<template>
  <div class="price-component">
    <div class="per-type" v-for="item of items" :key="item.name">
      {{ item.name }}
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
      items: [
        { name: 'Оконные рамы', price: 120500 },
        { name: 'Балконные кострукции', price: 48300 }
      ],
      priceFormatter: priceFormatter
    };
  },
  computed: {
    fullPrice() {
      let price = 0;

      this.items.map(item => (price = price + item.price));

      return price;
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
