<template>
  <div class="modal fade" id="MODAL_INTUITIVE_TYPE_EDIT" tabindex="-1" role="dialog" aria-labelledby="MODAL_INTUITIVE_TYPE_EDIT_LABEL" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="MODAL_INTUITIVE_TYPE_EDIT_LABEL">Тип</h5>
        </div>
        <div class="modal-body">
          <form @submit.prevent="update" id="MODAL_INTUITIVE_TYPE_EDIT_FORM">
            <div class="form-group">
              <label for="sIntuitiveTypeTitle">Название</label>
              <input type="text" class="form-control" v-model="type.sIntuitiveTypeTitle" autocomplete="off" required>
            </div>
            <div class="form-group">
              <label>SVG иконка</label>
              <textarea class="form-control" v-model="type.tIntuitiveTypeSVGIco"></textarea>
            </div>
            <div class="form-group">
              <label for="iSort">Сортировка</label>
              <input type="text" class="form-control" v-model.number="type.iSort" autocomplete="off">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="submit" form="MODAL_INTUITIVE_TYPE_EDIT_FORM" class="btn btn-primary">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modalIntuitiveTypeEdit',
  data() {
    return {
      type: {}
    }
  },
  methods: {
    open(iIntuitiveTypeID = null) {
      axios
        .post('/admin/intuitive/getType', {
          iIntuitiveTypeID
        })
        .then(response => {
          this.type = response.data || {}
          $('#MODAL_INTUITIVE_TYPE_EDIT').modal()
        });
    },
    update() {
      axios
        .post('/admin/intuitive/updateType', {
          type: this.type
        })
        .then(response => {
          $('#MODAL_INTUITIVE_TYPE_EDIT').modal('hide')
          this.$emit('reload')
        });
    }
  }
}
</script>