import Vue from 'vue';

export default {
  name: 'GalleryItem',
  props: ['gallery', 'index', 'products'],
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
        .post('/admin/index/s5/upload', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
            extension: event.target.files[0].name.split('.').pop()
          }
        })
        .then(({ data }) => {
          Vue.set(this.gallery, 'sGalleryIndexImage', data.filename);
          Vue.set(this, 'uploading', false);
        });
    },
    destroy() {
      Vue.set(this.gallery, 'destroy', true);
    }
  },
  template: `
    <div class="card mb-3" :class="{ destroy: gallery.destroy === true }">
      <div class="card-body">
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <label>Изображение</label>
              <label class="uploadImage">
                <input type="file" @change="upload('sGalleryIndexImage')" />
                <template v-if="!uploading">
                  <template v-if="gallery.sGalleryIndexImage">
                    <img :src="'/images/gallery/' + gallery.sGalleryIndexImage" />
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
              </label>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label :for="'sGalleryIndexTitle_' + index">Название</label>
              <input type="text" class="form-control" :id="'sGalleryIndexTitle_' + index" v-model="gallery.sGalleryIndexTitle" autocomplete="off">
            </div>
            <div class="form-group">
              <label :for="'tGalleryIndexText_' + index">Описание</label>
              <textarea class="form-control" rows="4" :id="'tGalleryIndexText_' + index" v-model="gallery.tGalleryIndexText" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="form-group mb-0">
              <label :for="'iProductID_' + index">Продукт</label>
              <select class="form-control" :id="'iProductID_' + index" v-model="gallery.iProductID">
                <option v-for="product in products" :key="product.iProductID" :value="product.iProductID">
                  {{ product.brand.sBrandTitle }} {{ product.sProductTitle }}
                  <template v-if="product.bru && product.bru.iBrusID">
                    {{ product.bru.sBrusTitle }}
                  </template>
                  <template v-if="product.material_category && product.material_category.iMaterialCategoryID">
                    {{ product.material_category.sMaterialCategoryTitle }}
                  </template>
                </option>
              </select>
            </div>
          </div>
          <div class="col">
            <div class="form-group mb-0">
              <label :for="'iOrder_' + index">Сортировка</label>
              <input class="form-control" :id="'iOrder_' + index" v-model="gallery.iOrder" />
            </div>
          </div>
          <div class="col-3">
            <div class="form-group mb-0">
              <label :for="'iActive_' + index">Активность</label>
              <div class="custom-control custom-switch mt-2">
                <input :id="'iActive_' + index" type="checkbox" class="custom-control-input" v-model="gallery.iActive">
                <label class="custom-control-label" :for="'iActive_' + index">
                  <template v-if="gallery.iActive">
                    Включено
                  </template>
                  <template v-else>
                    Выключено
                  </template>
                </label>
              </div>
            </div>
          </div>
          <div class="col-auto align-self-end">
            <button class="btn btn-danger btn-block" @click="destroy">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
};
