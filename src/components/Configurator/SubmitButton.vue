<template>
  <div class="submit-button">{{ text }}</div>
</template>

<script>
export default {
  name: 'SubmitButton',
  props: ['text']
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.submit-button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  background: $gradient-90deg;
  border-radius: 45px;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  transition: transform $transition-cubic-1;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  &::after {
    content: '';
    position: absolute;
    display: block;
    top: -1px;
    bottom: -0;
    right: 20px;
    width: 6px;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAAAXNSR0IArs4c6QAAAH1JREFUKBWV01EKgDAIBmCpa3Sx6Ga9RkfpFJ0l7PdBGKJOBz8L5jdjbMTMG/IiF7IilEUWH0THjY8UCdiRTwXmFGn7o4oUyFxCIyghC6bIAymKQIgy4KFzoe7AcUZd3GNuFcvmHnB31j+xIC22HabFIygVK2hf7/YDaj3RH6h171WBt325AAAAAElFTkSuQmCC');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
}
</style>
