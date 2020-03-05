export default {
  name: 'PartModelEdit',
  props: [
    'iPartID',
    'iPartBrandID',
    'iPartModelID'
  ],
  data() {
    return {
      partModel: {},
      loading: false
    }
  },
  created: function() {
    this.get()
  },
  watch: {
    iPartModelID: function () {
      this.get()
    }
  },
  methods: {
    get: function() {
      if (Number(this.iPartModelID)) {
        axios.post('/admin/part/getPartModelItem', {
          iPartModelID: this.iPartModelID
        }).then((responce) => {
          Vue.set(this, 'partModel', responce.data.partModel)
        })
      } else {
        Vue.set(this, 'partModel', {
          iPartBrandID: this.iPartBrandID,
          iOrder: 9999
        })
      }
    },
    update() {
      Vue.set(this, 'loading', true)
      axios.post('/admin/part/updatePartModel', this.partModel).then((response) => {
        const iPartModelID = response.data.partModel.iPartModelID
        Vue.set(this, 'partModel', response.data.partModel)
        Vue.set(this, 'loading', false)
        if (this.iPartModelID != iPartModelID) this.$router.push('/part/' + this.iPartID + '/' + this.iPartBrandID + '/' + response.data.partModel.iPartModelID)
        this.$emit('reloadPartModelList')
      })
    },
    upload() {
      var form = new FormData();
      form.append('file', event.target.files[0]);
      axios.post('/admin/part/uploadPartModel', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'extension': event.target.files[0].name.split('.').pop(),
          iPartModelID: this.iPartModelID
        }
      }).then((response) => {
        // Vue.set(this.product.product_images[index], column, response.data.filename)
      })
    },
    addImageColor() {
      console.log(222)
    }
  },
  template: `
    <div>
      <span v-if="!iPartModelID" class="myalert">Необходимо выбрать модель</span>
      <template v-else>
        <form id="PartModelEditForm" @submit.prevent="update">
          <div class="form-group">
            <label for="sPartModelTitleInput">sPartModelTitle</label>
            <input type="text" class="form-control" id="sPartModelTitleInput" v-model="partModel.sPartModelTitle" autocomplete="off" required>
          </div>
          <div class="form-group">
            <label for="iPartModelPriceInput">iPartModelPrice</label>
            <input type="text" class="form-control" id="iPartModelPriceInput" v-model.number="partModel.iPartModelPrice" autocomplete="off" required>
          </div>
          <div class="form-group">
            <label for="tPartModelDescInput">tPartModelDesc</label>
            <textarea class="form-control" id="tPartModelDescInput" v-model="partModel.tPartModelDesc" rows="5"></textarea>
          </div>
          <div class="form-group">
            <label for="iOrderInput">iOrder</label>
            <input type="text" class="form-control" id="iOrderInput" v-model.number="partModel.iOrder" autocomplete="off" required>
          </div>
          <div class="form-group">
            <label for="iActiveInput">iActive</label>
            <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" id="iActiveInput" v-model="partModel.iActive">
              <label class="custom-control-label" for="iActiveInput">
                <template v-if="partModel.iActive">Опубликовано</template>
                <template v-else>Скрыто</template>
              </label>
            </div>
          </div>
        </form>
        <div class="images">
          <div class="image" v-for="(image, imageIndex) in partModel.images" :key="imageIndex">
            <label>
              <input type="file" :name="imageIndex" @change="upload" />
              <img :src="'/images/part/' + image.sPartImageFile" />
            </label>
          </div>
          <div class="image">
            <label>
              <input type="file" @change="upload" />
              Выбрать изображение
            </label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary ml-3 mb-3" form="PartModelEditForm" :disabled="loading">Сохранить</button>
      </template>
    </div>
  `,
}
