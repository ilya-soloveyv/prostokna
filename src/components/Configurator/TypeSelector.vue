<template>
  <div class="type-selector">
    <div
      class="option"
      v-for="option in options"
      v-bind:class="{ selected: option.selected === true }"
      v-bind:key="option.value"
      v-on:click="() => select(option)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26.985"
        height="22.605"
        viewBox="0 0 26.985 22.605"
      >
        <path
          id="door"
          d="M26.635,40.188H.351A.355.355,0,0,1,0,39.829V38.295a.355.355,0,0,1,.351-.36H.778V28.059H.351a.36.36,0,0,1,0-.719H7.328v-9.4a.355.355,0,0,1,.351-.36H19.216a.355.355,0,0,1,.351.36v9.4h7.068a.36.36,0,0,1,0,.719H26.22v9.876h.415a.355.355,0,0,1,.351.36v1.534A.355.355,0,0,1,26.635,40.188ZM.7,39.469H26.284v-.815H.7Zm23.624-1.534h1.193V28.059H24.325Zm-2.328,0h1.627V28.059H22Zm-2.328,0H21.3V28.059H19.669Zm-2.328,0h1.524V28.059H17.341Zm-2.328,0H16.64V28.059H15.013Zm-2.328,0h1.626V28.059H12.685Zm-2.328,0h1.627V28.059H10.357Zm-2.328,0H9.656V28.059H8.029Zm-2.328,0H7.328V28.059H5.7Zm-2.328,0H5V28.059H3.373Zm-1.894,0H2.672V28.059H1.479Zm16.575-10.6h.811V18.3H8.029v9.037h.811V19.5a.355.355,0,0,1,.351-.36h3.6a.355.355,0,0,1,.351.36v7.839h.608V19.5a.355.355,0,0,1,.351-.36h3.6a.355.355,0,0,1,.351.36V27.34Zm-3.6,0h2.9V19.86h-2.9Zm-4.911,0h2.9V19.86h-2.9Z"
          transform="translate(0 -17.583)"
          fill="#fff"
        />
      </svg>

      <div class="badge">{{ option.badge }}</div>
    </div>
    <div class="backplate" v-bind:style="backplateStyle" />
  </div>
</template>

<script>
export default {
  name: 'TypeSelector',
  data: () => {
    return {
      options: [
        { badge: 12, value: '1' },
        { badge: 5, value: '2', selected: true },
        { badge: 3, value: '3' }
      ]
    };
  },
  computed: {
    backplateStyle() {
      const currentOption = this.options.find(option => option.selected);
      const currentPosition = this.options.indexOf(currentOption) + 1;
      const optionsCount = this.options.length;
      const percentPerOption = 100 / optionsCount;
      const left = percentPerOption * (currentPosition - 1);
      const right = percentPerOption * (optionsCount - currentPosition);

      return {
        left: `calc(${left}% + 5px)`,
        right: `calc(${right}% + 5px)`
      };
    }
  },
  methods: {
    select(selectedOption) {
      const options = [...this.options];
      const currentOption = options.find(option => option.selected);
      const currentIndex = options.indexOf(currentOption);
      const selectedIndex = options.indexOf(selectedOption);

      options[currentIndex].selected = false;
      options[selectedIndex].selected = true;

      this.options = options;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.type-selector {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  margin-bottom: 40px;
  padding: 5px 15px;
  border-radius: 50px;
  background-color: $gray-600;
}

.option {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  z-index: 1;
  cursor: pointer;

  svg,
  img {
    opacity: 0.5;
    transition: opacity $transition;
  }

  &.selected,
  &:hover {
    svg,
    img {
      opacity: 1;
    }
  }
}

.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 14px;
  margin-left: 10px;
  padding: 0 8px;
  font-size: 9px;
  border: 1px solid;
  border-color: rgba($light, 0.5);
  border-radius: 14px;
  transition: background-color $transition;

  .option.selected & {
    border-color: $accent-1;
    background-color: $accent-1;
  }
}

.backplate {
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  right: 5px;
  border-radius: 40px;
  background-color: $dark;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  transition: left $transition, right $transition;
}
</style>
