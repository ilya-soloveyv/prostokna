export default {
  name: 'Part',
  data() {
    return {}
  },
  created: function() {
    this.get()
  },
  methods: {
    get: function() {
      console.log('Part')
    }
  },
  template: `
    <router-view></router-view>
  `,
}
