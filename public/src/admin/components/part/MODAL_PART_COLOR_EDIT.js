export default {
  name: 'MODAL_PART_COLOR_EDIT',
  props: [
    'iPartBrandID'
  ],
  data() {
    return {
      loading: false,
      partColor: {},
      iPartColorID: null
    }
  },
  mounted() {
    const iPartColorID = this.$route.query.MODAL_PART_COLOR_EDIT
    Vue.set(this, 'iPartColorID', Number(iPartColorID))
    if (iPartColorID) $('#MODAL_PART_COLOR_EDIT').modal()

    $('#MODAL_PART_COLOR_EDIT').on('show.bs.modal', () => {
      const iPartColorID = this.$route.query.MODAL_PART_COLOR_EDIT
      Vue.set(this, 'iPartColorID', Number(iPartColorID))
    })
    $('#MODAL_PART_COLOR_EDIT').on('hide.bs.modal', () => {
      let query = Object.assign({}, this.$route.query);
      delete query.MODAL_PART_COLOR_EDIT
      this.$router.replace({ query })
      Vue.set(this, 'iPartColorID', null)
    })
  },
  watch: {
    iPartColorID: function () {
      this.get()
    }
  },
  methods: {
    get: function() {
      if (this.iPartColorID) {
        axios.post('/admin/part/getPartColorItem', {
          iPartColorID: this.iPartColorID
        }).then((response) => {
          Vue.set(this, 'partColor', response.data.partColor)
        })
      } else {
        Vue.set(this, 'partColor', {
          iOrder: 9999,
          iPartBrandID: this.iPartBrandID
        })
      }
    },
    update: function() {
      Vue.set(this, 'loading', true)
      axios.post('/admin/part/updatePartColor', this.partColor).then((response) => {
        Vue.set(this, 'partColor', response.data.partColor)
        Vue.set(this, 'loading', false)
        this.$emit('reloadPartColorList')
        $('#MODAL_PART_COLOR_EDIT').modal('hide')
      })
    }
  },
  template: `
    <div class="modal fade" id="MODAL_PART_COLOR_EDIT" tabindex="-1" role="dialog" aria-labelledby="MODAL_PART_COLOR_EDITLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="MODAL_PART_COLOR_EDITLabel">Карточка цвета</h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="update" id="modalPartColorEditForm">
              <div class="form-group">
                <label for="sPartColorTitle">sPartColorTitle</label>
                <input type="text" class="form-control" id="sPartColorTitle" v-model="partColor.sPartColorTitle" autocomplete="off" required>
              </div>
              <div class="form-group">
                <label for="sPartColorCode">sPartColorCode</label>
                <input type="text" class="form-control" id="sPartColorCode" v-model="partColor.sPartColorCode" autocomplete="off">
              </div>
              <div class="form-group">
                <label for="sPartColorTitleCode">sPartColorTitleCode</label>
                <input type="text" class="form-control" id="sPartColorTitleCode" v-model="partColor.sPartColorTitleCode" autocomplete="off" required>
              </div>
              <div class="form-group">
                <label for="partColor_iOrderInput">iOrder</label>
                <input type="text" class="form-control" id="partColor_iOrderInput" v-model.number="partColor.iOrder" autocomplete="off" required>
              </div>
              <div class="form-group">
                <label for="partColor_iActiveInput">iActive</label>
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="partColor_iActiveInput" v-model="partColor.iActive">
                  <label class="custom-control-label" for="partColor_iActiveInput">
                    <template v-if="partColor.iActive">Опубликовано</template>
                    <template v-else>Скрыто</template>
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="submit" form="modalPartColorEditForm" class="btn btn-primary" :disabled="loading">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  `,
}
