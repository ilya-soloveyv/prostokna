<template>
  <div class="row window-shape-layout">
    <div
      class="col-12 col-lg-7 col-xl-6"
      :class="{ flipped: currentProduct.isFlipped }"
      v-if="!isMobile || mobileLayoutPart === 1"
    >
      <SquareSelector
        :options="shapesGrid"
        :selected="selectedShapeId"
        @change="selectShape"
      />
    </div>

    <fragment v-if="!isMobile || mobileLayoutPart === 2">
      <div class="col-12 col-lg-5 col-xl-6">
        <Selector
          label="Материал"
          :options="avaibleMaterilas"
          :selected="currentProduct.materialId"
          @change="selectMaterial"
        />

        <!--
        Выводится если было соблюдено условие isCompactSliders
      -->
        <div class="row" v-if="isCompactSliders">
          <div
            class="col-12 col-lg-6 compact-slider"
            v-for="(size, key) of getAvaibleSizes()"
            :key="`sizeSlider_${key}`"
          >
            <Slider
              :label="size.text"
              :max="size.max"
              :min="size.min"
              :value="size.value"
              @change="value => onSizeChange(size.name, value)"
              points="мм"
            />
          </div>
        </div>
        <!--
        Выводится если НЕ было соблюдено условие isCompactSliders
      -->
        <div class="row" v-else>
          <div
            class="col-12"
            v-for="(size, key) of firstTwoSizes"
            :key="`sizeSlider_${key}`"
          >
            <Slider
              :label="size.text"
              :max="size.max"
              :min="size.min"
              :value="size.value"
              @change="value => onSizeChange(size.name, value)"
              points="мм"
            />
          </div>

          <!--
                  Выводится если было соблюдено условие isOptionsNoWrap
                -->
          <div class="col-12" v-if="isOptionsNoWrap">
            <Selector
              v-for="(pane, index) of avaiblePanes.windowPanes"
              :key="`windowPanes_${index}`"
              :label="`Открывание створки ${index + 1}`"
              :options="avaiblePanes.openings.windows"
              :selected="currentProduct.getWindowPaneOpening(index) || null"
              @change="value => onWindowPaneChange(index, value)"
            />
            <Selector
              v-for="(pane, index) of avaiblePanes.doorPanes"
              :key="`doorPanes_${index}`"
              :label="`Открывание двери ${index + 1}`"
              :options="avaiblePanes.openings.doors"
              :selected="currentProduct.getDoorPaneOpening(index) || null"
              @change="value => onDoorPaneChange(index, value)"
            />
          </div>
          <!-- endif -->
        </div>
        <!-- endif -->
      </div>

      <!--
      Выводится если условие isOptionsNoWrap не действительно
    -->
      <div class="col-12" v-if="!isOptionsNoWrap">
        <div class="row">
          <div
            class="col-12 col-lg-6"
            v-for="(size, key) of allOtherSizes"
            :key="`sizeSlider_${key}`"
          >
            <Slider
              v-if="!isCompactSliders"
              :label="size.text"
              :max="size.max"
              :min="size.min"
              :value="size.value"
              @change="value => onSizeChange(size.name, value)"
              points="мм"
            />
          </div>

          <div
            class="col-12 col-lg-6"
            v-for="(pane, index) of avaiblePanes.windowPanes"
            :key="`windowPanes_${index}`"
          >
            <Selector
              :key="`windowPanes_${index}`"
              :label="`Открывание створки ${index + 1}`"
              :options="avaiblePanes.openings.windows"
              :selected="currentProduct.getWindowPaneOpening(index) || null"
              @change="value => onWindowPaneChange(index, value)"
            />
          </div>

          <div
            class="col-12 col-lg-6"
            v-for="(pane, index) of avaiblePanes.doorPanes"
            :key="`doorPanes_${index}`"
          >
            <Selector
              :key="`doorPanes_${index}`"
              :label="`Открывание двери ${index + 1}`"
              :options="avaiblePanes.openings.doors"
              :selected="currentProduct.getDoorPaneOpening(index) || null"
              @change="value => onDoorPaneChange(index, value)"
            />
          </div>
        </div>
      </div>
      <!-- endif -->
    </fragment>

    <div class="col-12" v-if="isMobile">
      <MobileNaigation @prev="mobilePrev" @next="mobileNext" />
    </div>
  </div>
</template>

<script>
import { Fragment } from 'vue-fragment';
/**
 * Components
 */
import SquareSelector from './common/SquareSelector.vue';
import Selector from './common/Selector.vue';
import Slider from './common/Slider.vue';
import CheckBox from './common/CheckBox.vue';
import MobileNaigation from './common/MobileNaigation.vue';

/**
 * Utils
 */
import mapAsOptions from '@/utils/mapAsOptions.js';
import s from '@/utils/safeOpeningsSequence.js';

/**
 * Icons
 */
import flip from '@images/configurator/flip.svg';

export default {
  name: 'WindowShapeLayout',
  components: {
    SquareSelector,
    Selector,
    Slider,
    CheckBox,
    MobileNaigation,
    Fragment
  },
  inject: ['configuratorComponent'],
  data() {
    return {
      avaibleMaterilas: [],
      mobileLayoutPart: this.configuratorComponent.mobileLayoutPart
    };
  },
  computed: {
    prevScreen() {
      return this.configuratorComponent.prevScreen;
    },
    nextScreen() {
      return this.configuratorComponent.nextScreen;
    },
    isMobile() {
      return this.configuratorComponent.isMobile;
    },
    products() {
      return this.$store.getters['configurator/productsWithCurrentType'];
    },
    currentProduct() {
      return this.$store.getters['configurator/currentProduct'];
    },
    selectedShapeId() {
      return this.currentProduct.selectedShapeId;
    },
    firstTwoSizes() {
      return this.getAvaibleSizes().slice(0, 2);
    },
    allOtherSizes() {
      return this.getAvaibleSizes().slice(2);
    },
    avaiblePanes() {
      return this.currentProduct.getAvaiblePanes();
    },
    lastUpdate() {
      return this.currentProduct.lastUpdate;
    },

    /**
     * Не переносим опции оконной кострукции если у нас строго одна створка окна или строго одна дверь
     */
    isOptionsNoWrap() {
      const avaiblePanes = this.avaiblePanes;
      // При изменении логики необходимо изменить описание выше!!!
      return (
        avaiblePanes.windowPanes.length + avaiblePanes.doorPanes.length === 1
      );
    },

    /**
     * Отображаем компактные слайдеры размеров в случае если есть и окно и дверь
     */
    isCompactSliders() {
      const avaiblePanes = this.avaiblePanes;
      // При изменении логики необходимо изменить описание выше!!!
      return (
        false &&
        avaiblePanes.windowPanes.length > 0 &&
        avaiblePanes.doorPanes.length > 0
      );
    },
    shapesGrid() {
      const grid = this.currentProduct
        ? [...this.currentProduct.getAvaibleShapes()]
        : [];

      grid.push({
        value: 'flip',
        icon: flip,
        text: 'ПОВЕРНУТЬ'
      });

      return grid;
    }
  },
  methods: {
    mobilePrev() {
      if (this.mobileLayoutPart === 2) return (this.mobileLayoutPart = 1);
      this.configuratorComponent.mobileLayout = 'summary';
    },
    mobileNext() {
      if (this.mobileLayoutPart === 1) return (this.mobileLayoutPart = 2);
      this.nextScreen();
    },

    getAvaibleSizes() {
      const baseValues = this.$store.state.configurator.baseValues;
      const windows = this.currentProduct.getWindowsPanes();
      const doors = this.currentProduct.getDoorsPanes();
      const windowsRange = baseValues.windows[s(windows.join(''))];
      const doorsRange = baseValues.doors[s(doors.join(''))];
      const avaibleSizes = [];

      const elementsData = this.currentProduct.getElementsData();
      const windowsCount = elementsData.windows.length;
      const doorsCount = elementsData.doors.length;

      if (windowsRange) {
        avaibleSizes.push(
          {
            min:
              windowsRange.x[0] * windowsCount +
              (doorsCount ? doorsRange.x[0] * doorsCount : 0),
            max:
              windowsRange.x[1] * windowsCount +
              (doorsCount ? doorsRange.x[1] * doorsCount : 0),
            name: 'windowWidth',
            text: 'Ширина окна',
            value:
              this.currentProduct.windowWidth ||
              windowsRange.x[0] * windowsCount
          },
          {
            min: windowsRange.y[0],
            max: windowsRange.y[1],
            name: 'windowHeight',
            text: 'Высота окна',
            value: this.currentProduct.windowHeight || windowsRange.x[0]
          }
        );
      }

      if (doorsRange) {
        avaibleSizes.push(
          {
            min: doorsRange.x[0],
            max: doorsRange.x[1],
            name: 'doorWidth',
            text: 'Ширина двери',
            value: this.currentProduct.doorWidth || doorsRange.x[0]
          },
          {
            min: doorsRange.y[0],
            max: doorsRange.y[1],
            name: 'doorHeight',
            text: 'Высота двери',
            value: this.currentProduct.doorHeight || doorsRange.x[0]
          }
        );
      }

      return avaibleSizes;
    },
    onWindowPaneChange(index, value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.setWindowPaneOpening(index, parseInt(value));
      });
    },
    onDoorPaneChange(index, value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.setDoorPaneOpening(index, parseInt(value));
      });
    },
    onSizeChange(name, value) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p[name] = value;
      });
    },
    selectMaterial(id) {
      this.$store.commit('configurator/mutateCurrentProduct', p => {
        p.materialId = parseInt(id);
      });
    },
    selectShape(value) {
      if (value === 'flip') {
        this.$store.commit('configurator/mutateCurrentProduct', p => {
          p.toggleFlipped();
        });
      } else {
        this.$store.commit('configurator/mutateCurrentProduct', p => {
          p.selectedShapeId = value;
        });
      }
    },
    async fetchMaterilas() {
      this.avaibleMaterilas = await this.currentProduct
        .fetchAvaibleMaterilas()
        .then(mapAsOptions);
    }
  },
  mounted() {
    this.fetchMaterilas();
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.compact-slider {
  &:nth-child(odd) .slider {
    margin-right: -5px;
  }

  &:nth-child(even) .slider {
    margin-left: -5px;
  }
}

.window-shape-layout {
  position: absolute;
  left: 0;
  right: 0;
}

.fade-enter-active {
  animation: fade-in $transition-time * 3;
}
.fade-leave-active {
  animation: fade-in $transition-time * 3 reverse;
}
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
