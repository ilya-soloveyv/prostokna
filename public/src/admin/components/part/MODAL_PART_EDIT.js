export default {
  name: 'MODAL_PART_EDIT',
  data() {
    return {
      loading: false,
      part: {},
      iPartID: null
    }
  },
  mounted() {
    const iPartID = this.$route.query.MODAL_PART_EDIT
    Vue.set(this, 'iPartID', Number(iPartID))
    if (iPartID) $('#MODAL_PART_EDIT').modal()

    $('#MODAL_PART_EDIT').on('show.bs.modal', () => {
      const iPartID = this.$route.query.MODAL_PART_EDIT
      Vue.set(this, 'iPartID', Number(iPartID))
    })
    $('#MODAL_PART_EDIT').on('shown.bs.modal', () => {
      this.$refs.sPartTitle.focus()
    })
    $('#MODAL_PART_EDIT').on('hide.bs.modal', () => {
      let query = Object.assign({}, this.$route.query);
      delete query.MODAL_PART_EDIT
      this.$router.replace({ query })
      Vue.set(this, 'iPartID', null)
    })
  },
  watch: {
    iPartID: function () {
      this.get()
    }
  },
  methods: {
    get: function() {
      if (this.iPartID) {
        axios.post('/admin/part/getPartItem', {
          iPartID: this.iPartID
        }).then((response) => {
          Vue.set(this, 'part', response.data.part)
        })
      } else {
        Vue.set(this, 'part', {
          iOrder: 9999,
          iActive: true
        })
      }
    },
    update: function() {
      Vue.set(this, 'loading', true)
      axios.post('/admin/part/updatePart', this.part).then((response) => {
        Vue.set(this, 'part', response.data.part)
        Vue.set(this, 'loading', false)
        this.$emit('reloadPartList')
        $('#MODAL_PART_EDIT').modal('hide')
      })
    }
  },
  template: `
    <div class="modal fade" id="MODAL_PART_EDIT" tabindex="-1" role="dialog" aria-labelledby="MODAL_PART_EDITLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="MODAL_PART_EDITLabel">Карточка комплектующего</h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="update" id="modalPartEditForm">
              <div class="form-group">
                <label for="sPartTitle">Название</label>
                <input type="text" class="form-control" id="sPartTitle" ref="sPartTitle" v-model="part.sPartTitle" autocomplete="off" required>
              </div>
              <div class="form-group">
                <label for="sPartURI">URI</label>
                <input type="text" ref="sPartURI" class="form-control" id="sPartURI" v-model="part.sPartURI" autocomplete="off">
              </div>
              <div class="form-group">
                <label for="iOrderInput">iOrder</label>
                <input type="text" class="form-control" id="iOrderInput" v-model.number="part.iOrder" autocomplete="off" required>
              </div>
              <div class="form-group">
                <label for="iActiveInput">iActive</label>
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="iActiveInput" v-model="part.iActive">
                  <label class="custom-control-label" for="iActiveInput">
                    <template v-if="part.iActive">Опубликовано</template>
                    <template v-else>Скрыто</template>
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="submit" form="modalPartEditForm" class="btn btn-primary" :disabled="loading">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  `,
}
