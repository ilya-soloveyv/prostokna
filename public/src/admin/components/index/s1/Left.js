export default {
  name: 's1Left',
  data() {
    return {
      left: {}
    }
  },
  created() {
    this.get()
  },
  methods: {
    get() {
      axios.post('/admin/index/s1/left/get').then(({ data }) => {
        Vue.set(this, 'left', data.left)
      })
    },
    update() {
      axios.post('/admin/index/s1/left/update', this.left).then(({ data }) => {
        this.get()
      })
    }
  },
  template: `
    <div>
      <form id="IndexS1LeftForm" @submit.prevent="update">
        <div class="form-group">
          <label for="s1Title">Заголовок</label>
          <input type="text" class="form-control" id="s1Title" ref="s1Title" v-model="left.s1Title" autocomplete="off" required>
        </div>
        <div class="form-group">
          <label for="s1Desc">Подзагаловок</label>
          <input type="text" class="form-control" id="s1Desc" ref="s1Desc" v-model="left.s1Desc" autocomplete="off" required>
        </div>
        <button type="submit" class="btn btn-primary">Сохранить</button>
      </form>
    </div>
  `,
}
