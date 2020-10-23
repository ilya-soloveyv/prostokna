<template>
  <div class="header">
    <div class="tiile">{{ tiile }}</div>
    <div class="prev" />
    <div class="next" />
    <div class="dots">
      <div class="dot" />
      <div class="dot selected" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data: () => {
    return {
      tiile: 'ТИПЫ И РАЗМЕРЫ ОКОН'
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.header {
  position: relative;
  text-align: center;
  padding-bottom: 25px;
  margin-bottom: 40px;
}

.tiile {
  font-size: 22px;
  font-weight: 500;
}

.prev,
.next {
  position: absolute;
  top: 0;
  left: 0;
  width: 22px;
  height: 33px;
  transform: rotate(180deg);
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAAAXNSR0IArs4c6QAAAH1JREFUKBWV01EKgDAIBmCpa3Sx6Ga9RkfpFJ0l7PdBGKJOBz8L5jdjbMTMG/IiF7IilEUWH0THjY8UCdiRTwXmFGn7o4oUyFxCIyghC6bIAymKQIgy4KFzoe7AcUZd3GNuFcvmHnB31j+xIC22HabFIygVK2hf7/YDaj3RH6h171WBt325AAAAAElFTkSuQmCC');
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.25;
  transition: opacity $transition;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
}

.next {
  left: initial;
  right: 0;
  transform: none;
}

.dots {
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
}

.dot {
  position: relative;
  width: 5px;
  height: 5px;
  padding: 10px;
  margin: 0 5px;
  opacity: 0.2;
  transition: opacity $transition;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    display: block;
    top: 7px;
    left: 7px;
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background-color: $border-dark;
  }

  &:hover,
  &.selected {
    opacity: 0.75;

    &::before {
      background-color: $accent-1;
    }
  }

  &.selected {
    opacity: 1;
  }
}
</style>
