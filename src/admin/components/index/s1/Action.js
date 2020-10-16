import Vue from 'vue';

export default {
  name: 'Action',
  props: {
    action: {
      type: Object,
      required: false,
      default: {}
    },
    actionIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      uploading: false
    };
  },
  methods: {
    upload(image) {
      Vue.set(this, 'uploading', true);
      var form = new FormData();
      form.append('file', event.target.files[0]);
      axios
        .post('/admin/index/s1/actions/upload', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
            extension: event.target.files[0].name.split('.').pop()
          }
        })
        .then(({ data }) => {
          Vue.set(this.action, image, data.filename);
          Vue.set(this, 'uploading', false);
        });
    },
    destroy() {
      Vue.set(this.action, 'del', true);
    }
  },
  template: `
    <div class="col-12">
      <div class="card mb-3" :class="{ destroy: action.del === true }">
        <div class="card-body">
          <div class="row">
            <div class="col-3">
              <div class="form-group mb-0">
                <label>Изображение</label>
                <label class="s1ActionImage">
                  <input type="file" @change="upload('s1ActionImage')" />
                  <div class="img">
                    <template v-if="!uploading">
                      <template v-if="action.s1ActionImage">
                        <img :src="'/images/actions/' + action.s1ActionImage" />
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
            </div>
            <div class="col-3">
              <div class="form-group mb-0">
                <label>Мобильный</label>
                <label class="s1ActionImage">
                  <input type="file" @change="upload('s1ActionImageMobile')" />
                  <div class="img">
                    <template v-if="!uploading">
                      <template v-if="action.s1ActionImageMobile">
                        <img :src="'/images/actions/' + action.s1ActionImageMobile" />
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
            </div>
            <div class="col-6">
              <div class="form-group">
                <label :for="'s1ActionTitle_' + actionIndex">Название</label>
                <textarea rows="3" class="form-control" :id="'s1ActionTitle_' + actionIndex" v-model="action.s1ActionTitle" autocomplete="off" required></textarea>
              </div>
              <div class="form-group">
                <label :for="'s1ActionURL_' + actionIndex">URL</label>
                <input type="text" class="form-control" :id="'s1ActionURL_' + actionIndex" v-model="action.s1ActionURL" autocomplete="off">
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="form-group mb-0">
                    <label :for="'iOrder_' + actionIndex">Сортировка</label>
                    <input type="text" class="form-control" :id="'iOrder_' + actionIndex" v-model="action.iOrder" autocomplete="off" required>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group mb-0">
                    <label :for="'iActive_' + actionIndex">Активность</label>
                    <div class="custom-control custom-switch mt-2">
                      <input type="checkbox" class="custom-control-input" :id="'iActive_' + actionIndex" v-model="action.iActive">
                      <label class="custom-control-label" :for="'iActive_' + actionIndex">
                        <template v-if="action.iActive">Включено</template>
                        <template v-else>Отключено</template>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="col-auto">
                  <div class="form-group mb-0">
                    <button @click="destroy" type="button" class="btn btn-danger" style="margin-top: 31px">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};
