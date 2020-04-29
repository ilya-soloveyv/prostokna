import GalleryItem from '../../../components/index/s5/Item.js'
export default {
  name: 's5Gallery',
  components: {
    GalleryItem
  },
  data() {
    return {
      gallery: []
    }
  },
  created() {
    this.get()
  },
  methods: {
    get() {
      axios.post('/admin/index/s5/get').then(({ data }) => {
        Vue.set(this, 'gallery', data.gallery)
      })
    },
    update() {
      // axios.post('/admin/index/s1/actions/update', {
      //   actions: this.actions
      // }).then(({ data }) => {
      //   this.get()
      // })
    },
    add() {
      // this.actions.push({
      //   iActive: true,
      //   iOrder: 9999
      // })
      // this.$nextTick(function () {
      //   const IndexS1ActionsForm = this.$el.querySelector("#IndexS1ActionsForm")
      //   IndexS1ActionsForm.scrollTop = IndexS1ActionsForm.scrollHeight
      // })
    },
  },
  template: `
    <div class="editBlock IndexS5Gallery">
      <div class="editData">
        <GalleryItem v-for="(gallery, index) in gallery" :key="index" :index="index" :gallery="gallery" />
      </div>
      <div class="editButtons">
        editButtons
      </div>
    </div>
  `,
}
