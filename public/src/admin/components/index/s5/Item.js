export default {
  name: 'GalleryItem',
  props: ['gallery', 'index'],
  data() {
    return {
    }
  },
  template: `
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <label>Изображение</label>
              
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
        <pre>{{ gallery }}</pre>
      </div>
    </div>
  `,
}
