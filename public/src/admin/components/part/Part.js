import PartList from './PartList.js'
import PartBrand from './PartBrand.js'
import PartModel from './PartModel.js'
import PartModelEdit from './PartModelEdit.js'
import PartColor from './PartColor.js'
import MODAL_PART_EDIT from './MODAL_PART_EDIT.js'
import MODAL_PART_BRAND_EDIT from './MODAL_PART_BRAND_EDIT.js'
import MODAL_PART_COLOR_EDIT from './MODAL_PART_COLOR_EDIT.js'

export default {
  name: 'Part',
  components: {
    PartList,
    PartBrand,
    PartModel,
    PartModelEdit,
    PartColor,
    MODAL_PART_EDIT,
    MODAL_PART_BRAND_EDIT,
    MODAL_PART_COLOR_EDIT
  },
  props: {
    iPartID: String,
    iPartBrandID: String,
    iPartModelID: String
  },
  data() {
    return {
      partColorList: []
    }
  },
  methods: {
    reloadPartList() {
      this.$refs.PartList.get()
    },
    partListAdd() {
      $('#MODAL_PART_EDIT').modal()
    },
    reloadPartBrandList() {
      this.$refs.PartBrand.get()
    },
    partBrandListAdd() {
      $('#MODAL_PART_BRAND_EDIT').modal()
    },
    reloadPartModelList() {
      this.$refs.PartModel.get()
    },
    partColorListAdd() {
      $('#MODAL_PART_COLOR_EDIT').modal()
    },
    reloadPartColorList() {
      this.$refs.PartColor.get()
    },
    reloadPartColorList2(partColorList) {
      Vue.set(this, 'partColorList', partColorList)
      // console.log(partColorList)
    }
  },
  template: `
    <div id="part">
      <div class="partBlock partList">
        <h2>
          <span>Комплектующие</span>
          <router-link class="add" @click.native="partListAdd" to="?MODAL_PART_EDIT=0">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#007BFF" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          </router-link>
        </h2>
        <div class="blockData">
          <PartList ref="PartList" :iPartID="iPartID" />
        </div>
      </div>
      <div class="partBlock partBrandList">
        <h2>
          <span>Бренды</span>
          <router-link class="add" v-if="iPartID" @click.native="partBrandListAdd" to="?MODAL_PART_BRAND_EDIT=0">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#007BFF" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          </router-link>
        </h2>
        <div class="blockData">
          <PartBrand ref="PartBrand" :iPartID="iPartID" :iPartBrandID="iPartBrandID" />
        </div>
      </div>
      <div class="partBlock partModelList">
        <h2>
          <span>Модели</span>
          <router-link class="add" v-if="iPartBrandID" :to="'/part/' + iPartID + '/' + iPartBrandID + '/0'">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#007BFF" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          </router-link>
        </h2>
        <div class="blockData">
          <PartModel ref="PartModel" :iPartID="iPartID" :iPartBrandID="iPartBrandID" :iPartModelID="iPartModelID" />
        </div>
      </div>
      <div class="partBlock partModelEdit">
        <h2>
          <span>Карточка модели</span>
        </h2>
        <div class="blockData">
          <PartModelEdit :iPartID="iPartID" :iPartBrandID="iPartBrandID" :iPartModelID="iPartModelID" :partColorList="partColorList" @reloadPartModelList="reloadPartModelList" />
        </div>
      </div>
      <div class="partBlock partModelColor">
        <h2>
          <span>Цвета</span>
          <router-link class="add" v-if="iPartBrandID" @click.native="partColorListAdd" to="?MODAL_PART_COLOR_EDIT=0">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#007BFF" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          </router-link>
        </h2>
        <div class="blockData">
          <PartColor ref="PartColor" :iPartID="iPartID" :iPartBrandID="iPartBrandID" @reloadPartColorList2="reloadPartColorList2" />
        </div>
      </div>
      <MODAL_PART_EDIT @reloadPartList="reloadPartList" />
      <MODAL_PART_BRAND_EDIT :iPartID="iPartID" @reloadPartBrandList="reloadPartBrandList" />
      <MODAL_PART_COLOR_EDIT :iPartBrandID="iPartBrandID" @reloadPartColorList="reloadPartColorList" />
    </div>
  `,
}
