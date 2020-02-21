export default {
  name: 'PartList',
  data() {
    return {}
  },
  created: function() {
    this.get()
  },
  methods: {
    get: function() {
      console.log('PartList')
    }
  },
  template: `
    <div class="PartList">PartList</div>
  `,
}
