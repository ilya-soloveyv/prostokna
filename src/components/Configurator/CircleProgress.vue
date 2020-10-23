<template>
  <div class="circle-progress" v-on:click="onClick">
    <div class="circle">
      <div class="percent">{{ percent }}%</div>
      <CircleCounter
        size="100%"
        stroke="#4E4E4E"
        active-stroke="#8AE4FB"
        v-bind:dash-spacing="0"
        v-bind:stroke-width="4"
        v-bind:active-width="4"
        v-bind:dash-count="100"
        v-bind:active-count="percent"
      />
    </div>

    <div class="text">{{ text }}</div>
  </div>
</template>

<script>
import CircleCounter from 'vue-circle-counter'; // https://github.com/snirp/vue-circle-counter

export default {
  name: 'CircleProgress',
  components: {
    CircleCounter
  },
  data() {
    return {
      percent: 25,
      text: 'Percent'
    };
  },
  methods: {
    onClick() {
      this.percent = Math.round(Math.random() * 100);
    }
  }
};
</script>

<style lang="scss" scoped>
.circle {
  position: relative;
}

.percent {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 14px;
}

.text {
  margin-top: 15px;
  font-size: 10px;
  text-align: center;
  text-transform: uppercase;
}
</style>
