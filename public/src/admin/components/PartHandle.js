export default {
  name: 'PartHandle',
  data() {
    return {
      handleBrand: [],
      handle: []
    }
  },
  created: function() {
    this.get()
  },
  methods: {
    get: function() {
      axios.post('/admin/part/handle/get', {}).then((responce) => {
        this.handleBrand = responce.data.handleBrand,
        this.handle = responce.data.handle
      })
    }
  },
  template: `
    <div class="PartHandle">
      <div class="brand">
        <ul>
          <li v-for="(brand, indexBrand) in handleBrand" :key="indexBrand">
            <router-link :to="'/part/handle/' + brand.iHandleBrandID">{{ brand.sHandleBrandTitle }}</router-link>
          </li>
        </ul>
        {{ handleBrand }}
      </div>
      <div class="model">
        <ul>
          <li v-for="(handle, indexHandle) in handle" :key="indexHandle">
            <router-link :to="'/part/handle/' + handle.iHandleID">{{ handle.sHandleTitle }}</router-link>
          </li>
        </ul>
        {{ handle }}
      </div>
      <div class="handle">
        handle
      </div>
    </div>
  `,
}
