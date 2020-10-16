<template>
  <div>
    <form id="IndexS1LeftForm" @submit.prevent="update">
      <div class="form-group">
        <label for="s1Title">Заголовок</label>
        <input
          type="text"
          class="form-control"
          id="s1Title"
          ref="s1Title"
          v-model="s1Title"
          autocomplete="off"
          required
        />
      </div>
      <div class="form-group">
        <label for="s1Desc">Подзагаловок</label>
        <input
          type="text"
          class="form-control"
          id="s1Desc"
          ref="s1Desc"
          v-model="s1Desc"
          autocomplete="off"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Сохранить</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 's1Left',
  data() {
    return {
      s1Title: '',
      s1Desc: ''
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      axios.post('/admin/index/s1/left/get').then(({ data }) => {
        if (data.left) {
          this.s1Title = data.left.s1Title;
          this.s1Desc = data.left.s1Desc;
        }
      });
    },
    update() {
      axios
        .post('/admin/index/s1/left/update', {
          s1Title: this.s1Title,
          s1Desc: this.s1Desc
        })
        .then(({ data }) => {
          this.get();
        });
    }
  }
};
</script>
