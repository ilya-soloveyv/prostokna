import Vue from 'vue';

import GalleryItem from '../../../components/index/s5/Item.js';

export default {
  name: 's5Gallery',
  components: {
    GalleryItem
  },
  data() {
    return {
      gallery: [],
      products: [],
      loading: false
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      axios.post('/admin/index/s5/get').then(({ data }) => {
        Vue.set(this, 'gallery', data.gallery);
        Vue.set(this, 'products', data.products);
      });
    },
    update() {
      Vue.set(this, 'loading', true);
      axios
        .post('/admin/index/s5/update', {
          gallery: this.gallery
        })
        .then(({ data }) => {
          Vue.set(this, 'loading', false);
          this.get();
        });
    },
    add() {
      this.gallery.push({
        iActive: true,
        iOrder: 9999
      });
      this.$nextTick(function() {
        const el = this.$el.querySelector('.editData');
        el.scrollTop = el.scrollHeight;
      });
    }
  },
  template: `
    <div class="editBlock IndexS5Gallery">
      <div class="editData">
        <GalleryItem v-for="(gallery, index) in gallery" :key="index" :index="index" :gallery="gallery" :products="products" />
      </div>
      <div class="editButtons">
        <button class="btn btn-light" @click="add">Добавить</button>
        <button class="btn btn-success float-right" :disabled="loading" @click="update">Сохранить</button>
      </div>
    </div>
  `
};
