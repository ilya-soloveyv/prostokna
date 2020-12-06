import Vue from 'vue';

export default {
  name: 'PartValve',
  data() {
    return {};
  },
  created: function() {
    this.get();
  },
  methods: {
    get: function() {
      console.log('PartValve');
    }
  },
  template: `
    <div class="PartValve">PartValve</div>
  `
};
