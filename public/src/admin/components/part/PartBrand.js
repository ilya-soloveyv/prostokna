export default {
  name: 'PartBrand',
  props: [
    'iPartID',
    'iPartBrandID'
  ],
  data() {
    return {
      brandList: []
    }
  },
  created: function() {
    this.get()
  },
  watch: {
    iPartID: function () {
      this.get()
    }
  },
  methods: {
    get: function() {
      if (this.iPartID) {
        axios.post('/admin/part/getBrandList', {
          iPartID: this.iPartID
        }).then((responce) => {
          Vue.set(this, 'brandList', responce.data.partBrandList)
        })
      } else {
        Vue.set(this, 'brandList', [])
      }
    },
    edit: function() {
      $('#MODAL_PART_BRAND_EDIT').modal()
    },
    destroy: function(iPartBrandID) {
      if(confirm("Подтверждаете удаление?")) {
        axios.post('/admin/part/destroyPartBrand', { iPartBrandID }).then((responce) => {
          this.get()
          if (iPartBrandID == this.iPartBrandID) this.$router.push('/part/' + this.iPartID)
        })
      }
    }
  },
  template: `
    <div>
      <span v-if="!iPartID" class="myalert">Необходимо выбрать раздел комплектующих</span>
      <span v-else-if="iPartID && !brandList.length" class="myalert">Не найдено</span>
      <ul v-else>
        <li v-for="(brand, brandIndex) in brandList" :key="brandIndex" :class="{ noActive: !brand.iActive }">
          <router-link :to="'/part/' + iPartID + '/' + brand.iPartBrandID" :class="{ active: brand.iPartBrandID === iPartBrandID }" class="title">
            {{ brand.sPartBrandTitle }}
          </router-link>
          <router-link @click.native="edit" :to="'?MODAL_PART_BRAND_EDIT=' + brand.iPartBrandID" class="edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </router-link>
          <div class="destroy" @click="destroy(brand.iPartBrandID)">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </div>
        </li>
      </ul>
    </div>
  `,
}
