<template>
  <div>
    <TypeSelector />
    <WindowsSlider />
    <AddWindow />
    <Price />
    <Files />
    <SubmitButton text="ОТПРАВИТЬ НА РАСЧЕТ" />
  </div>
</template>

<script>
import SubmitButton from './SubmitButton.vue';
import TypeSelector from './TypeSelector.vue';
import WindowsSlider from './WindowsSlider.vue';
import AddWindow from './AddWindow.vue';
import Price from './Price.vue';
import Files from './Files.vue';

export default {
  name: 'Summary',
  components: {
    SubmitButton,
    TypeSelector,
    WindowsSlider,
    AddWindow,
    Price,
    Files
  }
};
</script>

<style></style>
