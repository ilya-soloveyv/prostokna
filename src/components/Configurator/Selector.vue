<template>
  <div class="selector">
    <label>{{ label }}</label>
    <select>
      <option
        v-for="option of options"
        v-bind:value="option.value"
        v-bind:key="option.value"
        >{{ option.text }}</option
      >
    </select>
    <div class="arrow" />
  </div>
</template>

<script>
export default {
  name: 'Selector',
  props: ['label'],
  data: () => {
    return { options: [{ text: '123', value: 'test' }] };
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.selector {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  label {
    position: absolute;
    margin-bottom: 34px;
    padding: 22px 28px 0;
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
    color: rgba($light, 0.6);
  }

  select {
    padding: 55px 28px 22px;

    background: $gray-darker;
    border: 1px solid;
    border-color: $border-dark;
    border-radius: 8px;
    color: $light !important;

    transition: border-color $transition;

    outline: none !important;

    option {
      padding: 0;
    }

    appearance: none;
    -webkit-appearance: none;

    &,
    &::placeholder {
      font-size: 18px;
      font-weight: 400;
      color: $light;
    }

    &::placeholder {
      color: $border-dark;
    }

    &:focus {
      border-color: rgba($light, 0.6);
    }
  }

  .arrow {
    position: absolute;
    bottom: 22px;
    right: 28px;
    width: 12px;
    height: 8px;
    font-size: 16px;
    font-weight: 400;
    text-align: right;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAICAYAAADN5B7xAAAAAXNSR0IArs4c6QAAAFpJREFUGBlj/P//vzUDBByF0rgoiDqghldA/A2InYCYAQcGyYHUvAIpgHFwaUKRh5mIIohkC4Y4TAM2mzAUgwxC1oCuCeREDGeia0DXBLIFRQ0j2BrMgMQZ1AC5ivkQzaTcsgAAAABJRU5ErkJggg==');
  }
}
</style>
