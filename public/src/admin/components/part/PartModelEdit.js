import PartModelEditImage from './PartModelEditImage.js'
export default {
  name: 'PartModelEdit',
  components: {
    PartModelEditImage
  },
  props: {
    iPartID: String,
    iPartBrandID: String,
    iPartModelID: String,
    partColorList: Array
  },
  data() {
    return {
      partModel: {},
      loading: false,
      uploading: false
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
          iOrder: 9999,
          iActive: true
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
            <label for="partModeliOrderInput">iOrder</label>
            <input type="text" class="form-control" id="partModeliOrderInput" v-model.number="partModel.iOrder" autocomplete="off" required>
          </div>
          <div class="form-group">
            <label for="partModeliActiveInput">iActive</label>
            <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" id="partModeliActiveInput" v-model="partModel.iActive">
              <label class="custom-control-label" for="partModeliActiveInput">
                <template v-if="partModel.iActive">Опубликовано</template>
                <template v-else>Скрыто</template>
              </label>
            </div>
          </div>
        </form>
        <div class="images">
          <PartModelEditImage
            v-for="(image, imageIndex) in partModel.images"
            :key="imageIndex"
            :iPartModelID="iPartModelID"
            :image="image"
            :partColorList="partColorList"
            @reloadImages="get"
          />
          <PartModelEditImage
            :iPartModelID="iPartModelID"
            :partColorList="partColorList"
            @reloadImages="get"
          />
        </div>
        <button type="submit" class="btn btn-primary ml-3 mb-3" form="PartModelEditForm" :disabled="loading">Сохранить</button>
      </template>
    </div>
  `,
}
