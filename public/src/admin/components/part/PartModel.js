export default {
  name: 'PartModel',
  props: [
    'iPartID',
    'iPartBrandID',
    'iPartModelID'
  ],
  data() {
    return {
      partModelList: []
    }
  },
  created: function() {
    this.get()
  },
  watch: {
    iPartBrandID: function () {
      this.get()
    }
  },
  methods: {
    get: function() {
      if (this.iPartBrandID) {
        axios.post('/admin/part/getPartModelList', {
          iPartBrandID: this.iPartBrandID
        }).then((responce) => {
          Vue.set(this, 'partModelList', responce.data.partModelList)
        })
      } else {
        Vue.set(this, 'partModelList', [])
      }
    },
    destroy: function(iPartModelID) {
      if(confirm("Подтверждаете удаление?")) {
        axios.post('/admin/part/destroyPartModel', { iPartModelID }).then((responce) => {
          this.get()
          if (iPartModelID == this.iPartModelID) this.$router.push('/part/' + this.iPartID + '/' + this.iPartBrandID)
        })
      }
    }
  },
  template: `
    <div>
      <span v-if="!iPartBrandID" class="myalert">Необходимо выбрать бренд</span>
      <span v-else-if="iPartBrandID && !partModelList.length" class="myalert">Не найдено</span>
      <ul v-else>
        <li v-for="(model, modelIndex) in partModelList" :key="modelIndex" :class="{ noActive: !model.iActive }">
            <router-link :to="'/part/' + iPartID + '/' + iPartBrandID + '/' + model.iPartModelID" :class="{ active: model.iPartModelID === iPartModelID }" class="title">
              {{ model.sPartModelTitle }}
            </router-link>
            <div class="destroy" @click="destroy(model.iPartModelID)">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </div>
          </li>
      </ul>
    </div>
  `,
}
