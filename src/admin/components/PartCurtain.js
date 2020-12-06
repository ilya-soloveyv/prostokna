import Vue from 'vue';

export default {
  name: 'PartCurtain',
  data() {
    return {};
  },
  created: function() {
    this.get();
  },
  methods: {
    get: function() {
      console.log('PartCurtain');
    }
  },
  template: `
    <div class="PartCurtain">PartCurtain</div>
  `
};
