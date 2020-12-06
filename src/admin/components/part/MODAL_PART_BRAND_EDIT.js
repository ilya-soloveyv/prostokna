import Vue from 'vue';

export default {
  name: 'MODAL_PART_BRAND_EDIT',
  props: ['iPartID'],
  data() {
    return {
      loading: false,
      partBrand: {},
      iPartBrandID: null
    };
  },
  mounted() {
    const iPartBrandID = this.$route.query.MODAL_PART_BRAND_EDIT;
    Vue.set(this, 'iPartBrandID', Number(iPartBrandID));
    if (iPartBrandID) $('#MODAL_PART_BRAND_EDIT').modal();

    $('#MODAL_PART_BRAND_EDIT').on('show.bs.modal', () => {
      const iPartBrandID = this.$route.query.MODAL_PART_BRAND_EDIT;
      Vue.set(this, 'iPartBrandID', Number(iPartBrandID));
    });
    $('#MODAL_PART_BRAND_EDIT').on('shown.bs.modal', () => {
      this.$refs.sPartBrandTitle.focus();
    });
    $('#MODAL_PART_BRAND_EDIT').on('hide.bs.modal', () => {
      let query = Object.assign({}, this.$route.query);
      delete query.MODAL_PART_BRAND_EDIT;
      this.$router.replace({ query });
      Vue.set(this, 'iPartBrandID', null);
    });
  },
  watch: {
    iPartBrandID: function() {
      this.get();
    }
  },
  methods: {
    get: function() {
      if (this.iPartBrandID) {
        axios
          .post('/admin/part/getPartBrandItem', {
            iPartBrandID: this.iPartBrandID
          })
          .then(response => {
            Vue.set(this, 'partBrand', response.data.partBrand);
          });
      } else {
        Vue.set(this, 'partBrand', {
          iPartID: this.iPartID,
          iOrder: 9999,
          iActive: true
        });
      }
    },
    update: function() {
      Vue.set(this, 'loading', true);
      axios
        .post('/admin/part/updatePartBrand', this.partBrand)
        .then(response => {
          Vue.set(this, 'partBrand', response.data.partBrand);
          Vue.set(this, 'loading', false);
          this.$emit('reloadPartBrandList');
          $('#MODAL_PART_BRAND_EDIT').modal('hide');
        });
    }
  },
  template: `
    <div class="modal fade" id="MODAL_PART_BRAND_EDIT" tabindex="-1" role="dialog" aria-labelledby="MODAL_PART_BRAND_EDITLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="MODAL_PART_BRAND_EDITLabel">Карточка бренда</h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="update" id="modalPartBrandEditForm">
              <div class="form-group">
                <label for="sPartBrandTitle">Название</label>
                <input type="text" class="form-control" id="sPartBrandTitle" ref="sPartBrandTitle" v-model="partBrand.sPartBrandTitle" autocomplete="off" required>
              </div>
              <div class="form-group">
                <label for="sPartBrandURI">URI</label>
                <input type="text" class="form-control" id="sPartBrandURI" v-model="partBrand.sPartBrandURI" autocomplete="off">
              </div>
              <div class="form-group">
                <label for="partBrand_iOrderInput">iOrder</label>
                <input type="text" class="form-control" id="partBrand_iOrderInput" v-model.number="partBrand.iOrder" autocomplete="off" required>
              </div>
              <div class="form-group">
                <label for="partBrand_iActiveInput">iActive</label>
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="partBrand_iActiveInput" v-model="partBrand.iActive">
                  <label class="custom-control-label" for="partBrand_iActiveInput">
                    <template v-if="partBrand.iActive">Опубликовано</template>
                    <template v-else>Скрыто</template>
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="submit" form="modalPartBrandEditForm" class="btn btn-primary" :disabled="loading">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  `
};
