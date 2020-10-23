<template>
  <div class="square-selector row">
    <div v-for="key of [1, 2, 3]" v-bind:key="key" class="option col-4">
      <div class="option-body">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="31"
          viewBox="0 0 15 31"
        >
          <g
            id="Иконка_копия_6"
            data-name="Иконка копия 6"
            transform="translate(-0.24 0.377)"
          >
            <g
              id="Прямоугольник_730_копия_5"
              data-name="Прямоугольник 730 копия 5"
              transform="translate(0.24 -0.377)"
              fill="none"
              stroke="#fff"
              stroke-width="1"
            >
              <rect width="15" height="31" stroke="none" />
              <rect x="0.5" y="0.5" width="14" height="30" fill="none" />
            </g>
          </g>
        </svg>
        <div class="description">Описание</div>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: 'SquareSelector' };
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.option {
  margin-top: -15px;
  padding-top: calc(100% / 3);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    bottom: 15px;
    left: 15px;
    right: 15px;
    border-radius: 8px;
    background: $gradient;
    opacity: 0;
    transition: opacity $transition;
    z-index: 1;
  }

  .selected,
  &:hover {
    &::after {
      opacity: 1;
    }

    .option-body {
      background: transparent;
    }
  }
}

.option-body {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 15px;
  bottom: 15px;
  left: 15px;
  right: 15px;
  border-radius: 8px;
  background: $gray-darker;
  color: $light !important;
  transition: background $transition;
  cursor: pointer;
  z-index: 2;

  svg,
  img {
    width: 75%;
    height: 40%;
  }
}

.description {
  position: absolute;
  bottom: 10%;
  left: 0;
  right: 0;
  font-size: 10px;
  text-align: center;
  text-transform: uppercase;
}
</style>
