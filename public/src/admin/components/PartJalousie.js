export default {
  name: 'PartJalousie',
  data() {
    return {}
  },
  created: function() {
    this.get()
  },
  methods: {
    get: function() {
      console.log('PartJalousie')
    }
  },
  template: `
    <div class="PartJalousie">PartJalousie</div>
  `,
}
