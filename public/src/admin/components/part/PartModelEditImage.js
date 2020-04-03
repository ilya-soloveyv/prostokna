export default {
  name: 'PartModelEditImage',
  props: {
    iPartModelID: String,
    partColorList: Array,
    image: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      uploading: false
    }
  },
  methods: {
    upload() {
      Vue.set(this, 'uploading', true)
      var form = new FormData();
      form.append('file', event.target.files[0]);
      axios.post('/admin/part/uploadPartColor', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'extension': event.target.files[0].name.split('.').pop(),
          iPartModelID: this.iPartModelID
        }
      }).then((response) => {
        this.$emit('reloadImages')
        Vue.set(this, 'uploading', false)
      })
    },
    destroy(iPartImageID) {
      axios.post('/admin/part/destroyPartModelImage', { iPartImageID }).then((response) => {
        this.$emit('reloadImages')
      })
    },
    updateImage(iPartColorID) {
      axios.post('/admin/part/updatePartModelImage', {
          iPartModelID: this.iPartModelID,
          iPartImageID: this.image.iPartImageID,
          iPartColorID: this.image.iPartColorID,
          iPartColorPrice: this.image.iPartColorPrice
      }).then((response) => {
        // Vue.set(this.partModel, 'images', response.data.images)
      })
    }
  },
  template: `
    <div class="image">
      <template v-if="image.iPartImageID">
        <label>
          <input type="file" :name="image.iPartColorID" @change="upload" />
          <img :src="'/images/part/' + image.sPartImageFile" />
        </label>
        <a class="destroy" @click.prevent="destroy(image.iPartImageID)" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </a>
        <input class="form-control" type="text" v-model="image.iPartColorPrice" placeholder="Цена" @change="updateImage" />
        <select class="form-control" @change="updateImage" v-model="image.iPartColorID">
          <option v-for="(color, colorIndex) in partColorList" :key="colorIndex" :value="color.iPartColorID">
            {{ color.sPartColorTitle }}
          </option>
        </select>
      </template>
      <template v-else>
        <label>
          <input type="file" @change="upload" />
          <template v-if="!uploading">Выбрать изображение</template>
          <template v-else>
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </template>
        </label>
      </template>
    </div>
  `,
}
