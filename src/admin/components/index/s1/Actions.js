import Vue from 'vue';
import Action from '../../../components/index/s1/Action.js';

export default {
  name: 's1Actions',
  components: {
    Action
  },
  data() {
    return {
      actions: []
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      axios.post('/admin/index/s1/actions/get').then(({ data }) => {
        // console.log(data)
        Vue.set(this, 'actions', data.actions);
      });
    },
    update() {
      axios
        .post('/admin/index/s1/actions/update', {
          actions: this.actions
        })
        .then(({ data }) => {
          this.get();
        });
    },
    add() {
      this.actions.push({
        iActive: true,
        iOrder: 9999
      });
      this.$nextTick(function() {
        const IndexS1ActionsForm = this.$el.querySelector(
          '#IndexS1ActionsForm'
        );
        IndexS1ActionsForm.scrollTop = IndexS1ActionsForm.scrollHeight;
      });
    }
  },
  template: `
    <div class="IndexS1Actions">
      <form id="IndexS1ActionsForm" @submit.prevent="update">
        <div class="row">
          <Action v-for="(action, index) in actions" :key="index" :action="action" :actionIndex="index"></Action>
        </div>
      </form>
      <div class="buttons">
        <button type="button" class="btn btn-secondary" @click="add">Добавить</button>
        <button type="submit" class="btn btn-primary float-right" form="IndexS1ActionsForm">Сохранить</button>
      </div>
    </div>
  `
};
