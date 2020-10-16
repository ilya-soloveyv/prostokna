import Vue from 'vue';

export default {
  name: 'PartList',
  props: ['iPartID'],
  data() {
    return {
      partList: []
    };
  },
  created: function() {
    this.get();
  },
  methods: {
    get: function() {
      axios.post('/admin/part/getPartList', {}).then(responce => {
        Vue.set(this, 'partList', responce.data.partList);
      });
    },
    edit() {
      $('#MODAL_PART_EDIT').modal();
    },
    destroy(iPartID) {
      if (confirm('Подтверждаете удаление?')) {
        axios.post('/admin/part/destroyPart', { iPartID }).then(responce => {
          this.get();
          if (iPartID == this.iPartID) this.$router.push('/part');
        });
      }
    }
  },
  template: `
    <ul>
      <li v-for="(part, partIndex) in partList" :key="partIndex" :class="{ noActive: !part.iActive }">
        <router-link :to="'/part/' + part.iPartID" :class="{ active: part.iPartID === iPartID }" class="title">
          {{ part.sPartTitle }}
        </router-link>
        <router-link @click.native="edit" :to="'?MODAL_PART_EDIT=' + part.iPartID" class="edit">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </router-link>
        <div class="destroy" @click="destroy(part.iPartID)">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </div>
      </li>
    </ul>
  `
};
