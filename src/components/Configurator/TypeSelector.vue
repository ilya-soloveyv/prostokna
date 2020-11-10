<template>
  <div class="type-selector">
    <div
      class="option"
      v-for="(type, key) in avaibleTypes"
      v-bind:class="{
        selected: key === selectedType
      }"
      v-bind:key="key"
      v-on:click="() => select(key)"
    >
      <img :src="type.icon" alt="" />

      <div class="badge">{{ getProductCountByType(key) }}</div>
    </div>
    <div class="backplate" v-bind:style="backplateStyle" />
  </div>
</template>

<script>
export default {
  name: 'TypeSelector',
  data: () => {
    return {};
  },
  computed: {
    avaibleTypes() {
      return this.$store.state.configurator.avaibleTypes;
    },
    selectedType() {
      return this.$store.getters['configurator/selectedType'];
    },
    backplateStyle() {
      const types = Object.keys(this.avaibleTypes);
      const currentOption = this.selectedType;
      const currentPosition = types.indexOf(currentOption) + 1;
      const optionsCount = types.length;
      const percentPerOption = 100 / optionsCount;
      const left = percentPerOption * (currentPosition - 1);
      const right = percentPerOption * (optionsCount - currentPosition);

      return {
        left: `calc(${left}% + 5px)`,
        right: `calc(${right}% + 5px)`
      };
    }
  },
  methods: {
    select(selectedType) {
      this.$store.commit('configurator/selectType', selectedType);
    },
    getProductCountByType(type) {
      return this.$store.getters['configurator/getProductCountByType'](type);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.type-selector {
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  height: 50px;
  margin-bottom: 40px;
  border-radius: 50px;
  background-color: $gray-600;
}

.option {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 0 5px;
  z-index: 1;
  cursor: pointer;

  svg,
  img {
    max-width: 25px;
    opacity: 0.5;
    transition: opacity $transition;
  }

  &.selected,
  &:hover {
    svg,
    img {
      opacity: 1;
    }
  }
}

.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 14px;
  margin-left: 10px;
  padding: 0 8px;
  font-size: 9px;
  border: 1px solid;
  border-color: rgba($light, 0.5);
  border-radius: 14px;
  transition: background-color $transition;

  .option.selected & {
    border-color: $accent-1;
    background-color: $accent-1;
  }
}

.backplate {
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  right: 5px;
  border-radius: 40px;
  background-color: $dark;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  transition: left $transition, right $transition;
}
</style>
