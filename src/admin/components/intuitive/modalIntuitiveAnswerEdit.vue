<template>
  <div class="modal fade" id="MODAL_INTUITIVE_ANSWER_EDIT" tabindex="-1" role="dialog" aria-labelledby="MODAL_INTUITIVE_ANSWER_EDIT_LABEL" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="MODAL_INTUITIVE_ANSWER_EDIT_LABEL">Вопрос</h5>
        </div>
        <div class="modal-body">
          <form @submit.prevent="update" id="MODAL_INTUITIVE_ANSWER_EDIT_FORM">
            <div class="form-group">
              <label for="sIntuitiveAnswerTitle">Название</label>
              <input type="text" class="form-control" v-model="answer.sIntuitiveAnswerTitle" autocomplete="off" required />
            </div>
            <div class="form-group">
              <label for="iSort">Сортировка</label>
              <input type="text" class="form-control" v-model.number="answer.iSort" autocomplete="off">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="submit" form="MODAL_INTUITIVE_ANSWER_EDIT_FORM" class="btn btn-primary">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modalIntuitiveAnswerEdit',
  props: {
    iIntuitiveQuestionID: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      answer: {}
    }
  },
  methods: {
    open(iIntuitiveAnswerID = null) {
      axios
        .post('/admin/intuitive/getAnswer', {
          iIntuitiveAnswerID
        })
        .then(response => {
          this.answer = response.data || {}
          $('#MODAL_INTUITIVE_ANSWER_EDIT').modal()
        });
    },
    update() {
      this.answer.iIntuitiveQuestionID = this.iIntuitiveQuestionID
      axios
        .post('/admin/intuitive/updateAnswer', {
          answer: this.answer
        })
        .then(response => {
          $('#MODAL_INTUITIVE_ANSWER_EDIT').modal('hide')
          this.$emit('reload')
        });
    }
  }
}
</script>