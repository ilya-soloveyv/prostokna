<template>
  <div id="configurator" class="ppage">
    <section class="left column">
      <TypeSelector />
      <WindowsSlider />
      <AddWindow />
      <Price />
      <SubmitButton text="ОТПРАВИТЬ НА РАСЧЕТ" />
    </section>
    <section class="column">
      <Header />
      <div class="row">
        <div class="col-6"><SquareSelector /></div>
        <div class="col-6">
          <Selector label="test" />
          <Slider label="Slider" />
          <CheckBox />
          <WindowDescription />
          <div class="row">
            <div class="col-4">
              <CircleProgress />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SquareSelector from './Configurator/SquareSelector.vue';
import Selector from './Configurator/Selector.vue';
import Slider from './Configurator/Slider.vue';
import Header from './Configurator/Header.vue';
import CheckBox from './Configurator/CheckBox.vue';
import SubmitButton from './Configurator/SubmitButton.vue';
import TypeSelector from './Configurator/TypeSelector.vue';
import CircleProgress from './Configurator/CircleProgress.vue';
import WindowsSlider from './Configurator/WindowsSlider.vue';
import AddWindow from './Configurator/AddWindow.vue';
import Price from './Configurator/Price.vue';
import WindowDescription from './Configurator/WindowDescription.vue';

export default {
  el: '#configurator',
  name: 'Configurator',
  components: {
    SquareSelector,
    Selector,
    Slider,
    Header,
    CheckBox,
    SubmitButton,
    CircleProgress,
    TypeSelector,
    WindowsSlider,
    AddWindow,
    Price,
    WindowDescription
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

#configurator {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding-left: 60px;
  background-color: $dark;
  color: $light;
  font-family: 'Montserrat', sans-serif;
}

.column {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  padding: 98px 38px;

  &.left {
    max-width: 355px;
    padding-right: 22px;
    border-right: 1px $border-dark solid;
  }
}
</style>
