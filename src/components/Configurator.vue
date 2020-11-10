<template>
  <div id="configurator" class="ppage">
    <section class="left column" v-if="$mq === 'lg'">
      <Summary />
    </section>
    <section class="column">
      <transition name="layout">
        <div v-if="productsWithCurrentType.length">
          <Header />
          <div class="position-relative">
            <transition name="layout">
              <WindowShapeLayout
                v-if="this.currentScreen === 'windows/shape'"
              />
              <WindowModelLayout
                v-if="this.currentScreen === 'windows/model'"
              />
              <WindowOtherLayout
                v-if="this.currentScreen === 'windows/other'"
              />
              <WindowColorLayout
                v-if="this.currentScreen === 'windows/color'"
              />
            </transition>
          </div>
        </div>
      </transition>
    </section>
  </div>
</template>

<script>
import Summary from './Configurator/Summary.vue';
import Header from './Configurator/Header.vue';
import WindowShapeLayout from './Configurator/WindowShapeLayout.vue';
import WindowModelLayout from './Configurator/WindowModelLayout.vue';
import WindowOtherLayout from './Configurator/WindowOtherLayout.vue';
import WindowColorLayout from './Configurator/WindowColorLayout.vue';

import api from '../utils/api';

import 'animate.css/source/fading_entrances/fadeIn.css';

export default {
  el: '#configurator',
  name: 'Configurator',
  components: {
    Summary,
    Header,
    WindowShapeLayout,
    WindowModelLayout,
    WindowOtherLayout,
    WindowColorLayout
  },
  data() {
    return {
      isInitialized: false
    };
  },
  computed: {
    currentScreen() {
      return this.$store.getters['configurator/currentScreen'];
    },
    productsWithCurrentType() {
      return this.$store.getters['configurator/productsWithCurrentType'];
    }
  },
  methods: {
    async init() {
      await this.fetchRanges();
    },
    async fetchRanges() {
      const ranges = await api.call('windowsRanges').then(res => res.payload);
      this.$store.commit('configurator/setRanges', ranges);
    }
  },
  mounted() {
    this.init();
    this.isInitialized = true;
  }
};
</script>

<style lang="scss">
@import '@scss/variables';

#top,
#top .menu {
  background-color: #363636;
}

.icon {
  color: #fff;
}

.bginput {
  color: #fff;

  border-color: #fff;
  input {
    color: #fff;
  }
  label {
    border-color: #82dcee;
  }
}

.menu {
  a {
    color: #fff !important;
  }

  a:hover,
  a:focus {
    color: #363636 !important;
    svg {
      color: #363636 !important;
    }
  }
}

#configurator {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding-left: 60px;
  background-color: $dark;
  color: $light;
  font-family: 'Montserrat', sans-serif;
}

.column {
  max-width: 814px;
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  padding: 98px 38px;

  &.left {
    max-width: 355px;
    padding-right: 22px;
    border-right: 1px $border-dark solid;
  }
}

.layout-enter-active {
  animation: fadeIn $transition-time * 3;
}
.layout-leave-active {
  animation: fadeIn $transition-time * 3 reverse;
}
</style>
