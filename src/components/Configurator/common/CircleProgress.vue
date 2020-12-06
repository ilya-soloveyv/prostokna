<template>
  <div class="circle-progress">
    <div class="circle">
      <div class="percent">{{ internalValue }}{{ points }}</div>
      <CircleCounter
        size="100%"
        stroke="#4E4E4E"
        :active-stroke="color"
        :dash-spacing="0"
        :stroke-width="4"
        :active-width="4"
        :dash-count="max"
        :active-count="internalValue - 1"
      />
    </div>

    <div class="text">{{ text }}</div>
  </div>
</template>

<script>
import CircleCounter from 'vue-circle-counter'; // https://github.com/snirp/vue-circle-counter
import BezierEasing from 'bezier-easing';

/**
 * animateNumber
 * Обеспечивает плавное изменение значения кругового прогресса
 */
const animateNumber = ({ from, to, render, onEnd }) => {
  let intervalId;
  let framesCount = 0;

  const transitionSize = to - from;
  const maxFrames = 500 / (1000 / 60);
  const curve = new BezierEasing(0.42, 0, 0.58, 1);

  intervalId = setInterval(() => {
    if (maxFrames < framesCount) {
      if (onEnd) onEnd();
      clearInterval(intervalId);
    }

    let value = Math.round(
      curve(framesCount / maxFrames) * transitionSize + from
    );

    render(value);
    framesCount++;
  }, 1000 / 60);
};

export default {
  name: 'CircleProgress',
  components: {
    CircleCounter
  },
  data() {
    return { oldValue: this.value, internalValue: this.value };
  },
  props: {
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      default: 0
    },
    points: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: '#8AE4FB'
    }
  },
  watch: {
    value() {
      animateNumber({
        from: this.oldValue,
        to: this.value,
        render: value => {
          window.requestAnimationFrame(() => {
            this.internalValue = value;
          });
        },
        onEnd: () => {
          this.oldValue = this.value;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.circle-progress {
  margin: 12.5px 0;
}

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
  margin-left: -15px;
  margin-right: -15px;
  font-size: 10px;
  text-align: center;
  text-transform: uppercase;
}
</style>
