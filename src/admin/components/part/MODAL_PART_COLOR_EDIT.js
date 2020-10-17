import Vue from 'vue';

export default {
  name: 'MODAL_PART_COLOR_EDIT',
  props: ['iPartBrandID'],
  data() {
    return {
      loading: false,
      partColor: {},
      iPartColorID: null,
      uploading: false
    };
  },
  mounted() {
    const iPartColorID = this.$route.query.MODAL_PART_COLOR_EDIT;
    Vue.set(this, 'iPartColorID', Number(iPartColorID));
    if (iPartColorID) $('#MODAL_PART_COLOR_EDIT').modal();

    $('#MODAL_PART_COLOR_EDIT').on('show.bs.modal', () => {
      const iPartColorID = this.$route.query.MODAL_PART_COLOR_EDIT;
      Vue.set(this, 'iPartColorID', Number(iPartColorID));
    });
    $('#MODAL_PART_COLOR_EDIT').on('shown.bs.modal', () => {
      this.$refs.sPartColorTitle.focus();
    });
    $('#MODAL_PART_COLOR_EDIT').on('hide.bs.modal', () => {
      let query = Object.assign({}, this.$route.query);
      delete query.MODAL_PART_COLOR_EDIT;
      this.$router.replace({ query });
      Vue.set(this, 'iPartColorID', null);
    });
  },
  watch: {
    iPartColorID: function() {
      this.get();
    }
  },
  methods: {
    get: function() {
      if (this.iPartColorID) {
        axios
          .post('/admin/part/getPartColorItem', {
            iPartColorID: this.iPartColorID
          })
          .then(response => {
            Vue.set(this, 'partColor', response.data.partColor);
          });
      } else {
        Vue.set(this, 'partColor', {
          iPartBrandID: this.iPartBrandID,
          iOrder: 9999,
          iActive: true
        });
      }
    },
    update: function() {
      Vue.set(this, 'loading', true);
      axios
        .post('/admin/part/updatePartColor', this.partColor)
        .then(response => {
          Vue.set(this, 'partColor', response.data.partColor);
          Vue.set(this, 'loading', false);
          this.$emit('reloadPartColorList');
          $('#MODAL_PART_COLOR_EDIT').modal('hide');
        });
    },
    upload() {
      alert(1);
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
                <label for="sPartColorTitle">Название цвета</label>
                <input type="text" class="form-control" id="sPartColorTitle" ref="sPartColorTitle" v-model="partColor.sPartColorTitle" autocomplete="off" required>
              </div>
              <div class="form-group">
                <label for="sPartColorCode">RGB код цвета</label>
                <input type="text" class="form-control" id="sPartColorCode" v-model="partColor.sPartColorCode" autocomplete="off">
              </div>
              <div class="form-group">
                <label for="sPartColorCode">Текстура цвета</label>
                <label class="sPartModelPart">
                  <input type="file" @change="upload" />
                  <div class="img">
                    <template v-if="!uploading">
                      <template v-if="partColor.sPartColorFile">
                        <img :src="'/images/part/' + partColor.sPartColorFile" />
                      </template>
                      <template v-else>
                        Выбрать изображение
                      </template>
                    </template>
                    <template v-else>
                      <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </template>
                  </div>
                </label>
              </div>
              <div class="form-group">
                <label for="partColor_iPartColorCheck">Цвет галочки</label>
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="partColor_iPartColorCheck" v-model="partColor.iPartColorCheck">
                  <label class="custom-control-label" for="partColor_iPartColorCheck">
                    <template v-if="partColor.iPartColorCheck">Черный</template>
                    <template v-else>Белый</template>
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label for="sPartColorTitleCode">Тех.название цвета</label>
                <input type="text" class="form-control" id="sPartColorTitleCode" v-model="partColor.sPartColorTitleCode" autocomplete="off" required>
              </div>
              <div class="form-group">
                <label for="partColor_iOrderInput">Сортировка</label>
                <input type="text" class="form-control" id="partColor_iOrderInput" v-model.number="partColor.iOrder" autocomplete="off" required>
              </div>
              <div class="form-group">
                <label for="partColor_iActiveInput">Активность</label>
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
  `
};
