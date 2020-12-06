<template>
  <div>
    <TypeSelector v-if="!isMobile" />
    <ProductsSlider />
    <AddWindow v-if="!isMobile" />
    <Price />
    <div class="row" v-if="isMobile">
      <div class="col-8" :style="{ marginRight: '-15px' }">
        <AddWindow label="Добавить окно" />
      </div>
      <div class="col-4" :style="{ paddingRight: '0' }">
        <FilesCompact />
      </div>
    </div>

    <Files v-if="!isMobile" />
    <FileList v-if="isMobile" />
    <SubmitButton
      text="ОТПРАВИТЬ НА РАСЧЕТ"
      @submit="e => $emit('submit', e)"
    />
  </div>
</template>

<script>
import SubmitButton from './SubmitButton.vue';
import TypeSelector from './TypeSelector.vue';
import ProductsSlider from './ProductsSlider.vue';
import AddWindow from './AddWindow.vue';
import Price from './Price.vue';
import Files from './Files.vue';
import FilesCompact from './FilesCompact.vue';
import FileList from './FileList.vue';

export default {
  name: 'Summary',
  components: {
    SubmitButton,
    TypeSelector,
    ProductsSlider,
    AddWindow,
    Price,
    Files,
    FilesCompact,
    FileList
  },
  inject: ['configuratorComponent'],
  computed: {
    isMobile() {
      return this.configuratorComponent.isMobile;
    }
  }
};
</script>

<style></style>
