<template>
  <div class="modal fade" id="MODAL_INTUITIVE_QUESTION_EDIT" tabindex="-1" role="dialog" aria-labelledby="MODAL_INTUITIVE_QUESTION_EDIT_LABEL" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="MODAL_INTUITIVE_QUESTION_EDIT_LABEL">Вопрос</h5>
        </div>
        <div class="modal-body">
          <form @submit.prevent="update" id="MODAL_INTUITIVE_QUESTION_EDIT_FORM">
            <div class="form-group">
              <label for="sIntuitiveQuestionTitle">Название</label>
              <input type="text" class="form-control" v-model="question.sIntuitiveQuestionTitle" autocomplete="off" required>
            </div>
            <div class="form-group">
              <label for="iSort">Сортировка</label>
              <input type="text" class="form-control" v-model.number="question.iSort" autocomplete="off">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="submit" form="MODAL_INTUITIVE_QUESTION_EDIT_FORM" class="btn btn-primary">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modalIntuitiveQuestionEdit',
  props: {
    iIntuitiveTypeID: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      question: {}
    }
  },
  methods: {
    open(iIntuitiveQuestionID = null) {
      axios
        .post('/admin/intuitive/getQuestion', {
          iIntuitiveQuestionID
        })
        .then(response => {
          this.question = response.data || {}
          $('#MODAL_INTUITIVE_QUESTION_EDIT').modal()
        });
    },
    update() {
      this.question.iIntuitiveTypeID = this.iIntuitiveTypeID
      axios
        .post('/admin/intuitive/updateQuestion', {
          question: this.question
        })
        .then(response => {
          $('#MODAL_INTUITIVE_QUESTION_EDIT').modal('hide')
          this.$emit('reload')
        });
    }
  }
}
</script>