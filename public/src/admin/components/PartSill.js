export default {
  name: 'PartSill',
  data() {
    return {}
  },
  created: function() {
    this.get()
  },
  methods: {
    get: function() {
      console.log('PartSill')
    }
  },
  template: `
    <div class="PartSill">PartSill</div>
  `,
}
