export default {
  name: 'PartGrid',
  data() {
    return {}
  },
  created: function() {
    this.get()
  },
  methods: {
    get: function() {
      console.log('PartGrid')
    }
  },
  template: `
    <div class="PartGrid">PartGrid</div>
  `,
}
