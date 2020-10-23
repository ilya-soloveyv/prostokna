<template>
  <div class="selector">
    <div class="label">{{ label }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'InputCard',
  props: ['label'],
  data: () => {
    return { options: [{ name: '123', val: 'test' }] };
  }
};
</script>
