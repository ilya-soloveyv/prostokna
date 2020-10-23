<template>
  <div class="checkbox">
    <input type="checkbox" id="name" />
    <label for="name">Label</label>
  </div>
</template>

<script>
export default {
  name: 'CheckBox'
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.checkbox {
  position: relative;
}

input {
  width: 0;
  height: 0;
  opacity: 0;

  & ~ label {
    padding-left: 48px;
    cursor: pointer;

    &::before,
    &::after {
      content: '';
      position: absolute;
      display: block;
      left: 0;
      top: -1.5px;
      width: 25px;
      height: 25px;
    }

    &::before {
      background-color: #2c2c2c;
    }

    &::after {
      opacity: 0;
      transform: scale(0);
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNi43MDUiIGhlaWdodD0iMTEuNzA3IiB2aWV3Qm94PSIwIDAgMTYuNzA1IDExLjcwNyI+CiAgPHBhdGggaWQ9IlBhdGhfMjI4ODkiIGRhdGEtbmFtZT0iUGF0aCAyMjg4OSIgZD0iTTE0NDA1Ljg0Ny00MjIwLjc2NWw1LjMxOSw1LjMxMSw4LjU1Ny04Ljg2NyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE0NDA0LjQzMiA0MjI1LjczNSkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzgyZGNlZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg==');
      background-repeat: no-repeat;
      background-position: center;
      transition: opacity $transition, transform $transition-cubic-1;
    }
  }

  &:checked ~ label::after {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
