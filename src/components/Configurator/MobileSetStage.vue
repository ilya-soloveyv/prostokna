<template>
  <div class="set-stage">
    <div class="title">РЕДАКТИРОВАТЬ С ЭТАПА:</div>
    <div class="stage-list">
      <div
        class="stage"
        v-for="(stage, index) of stages"
        :key="index"
        @click="stage.select"
      >
        <div class="icon"><img :src="stage.icon" /></div>
        <div class="name">{{ stage.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import graphicDesignIcon from '@/images/configurator/graphic-design-icon.svg';
import pantoneIcon from '@/images/configurator/pantone-icon.svg';
import alphabetIcon from '@/images/configurator/alphabet-icon.svg';
import schemeIcon from '@/images/configurator/scheme-icon.svg';

export default {
  name: 'MobileSetStage',
  inject: ['configuratorComponent'],
  data() {
    const self = this;

    return {
      stages: [
        {
          name: 'ТИП ОКНА',
          icon: schemeIcon,
          select() {
            self.configuratorComponent.mobileLayout = 'edit';
            self.configuratorComponent.selectScreen(
              `${self.currentType}/shape`
            );
            self.configuratorComponent.mobileLayoutPart = 1;
          }
        },
        {
          name: 'РАЗМЕР',
          icon: graphicDesignIcon,
          select() {
            self.configuratorComponent.mobileLayout = 'edit';
            self.configuratorComponent.selectScreen(
              `${self.currentType}/shape`
            );
            self.configuratorComponent.mobileLayoutPart = 2;
          }
        },
        {
          name: 'БРЕНД',
          icon: alphabetIcon,
          select() {
            self.configuratorComponent.mobileLayout = 'edit';
            self.configuratorComponent.selectScreen(
              `${self.currentType}/model`
            );
          }
        },
        {
          name: 'ЦВЕТ',
          icon: pantoneIcon,
          select() {
            self.configuratorComponent.mobileLayout = 'edit';
            self.configuratorComponent.selectScreen(
              `${self.currentType}/color`
            );
          }
        }
      ]
    };
  },
  computed: {
    currentType() {
      return this.$store.getters['configurator/selectedType'];
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.set-stage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 95%;

  .title {
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 40px !important;
  }

  .stage-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 215px !important;
  }

  .stage {
    width: 96px;
    flex-shrink: 0;
    margin: 3px;
    margin-bottom: 18px;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 96px;
      height: 96px;
      border-radius: 9px;
      background-color: $gray-800;
    }

    .name {
      font-size: 12px;
      font-weight: 500;
      margin-top: 9px;
      text-align: center;
    }
  }
}
</style>
