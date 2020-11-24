<template>
  <div class="configurator-modal" @mouseup="onBackdropClick" v-if="isVisible">
    <div class="modal-body" ref="body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean
  },
  data() {
    return {
      isVisible: this.visible
    };
  },
  methods: {
    onBackdropClick(e) {
      const path = e.composedPath();
      const bodyRef = this.$refs.body;
      if (!path.includes(bodyRef)) {
        this.closeEvent(e);
      }
    },
    closeEvent(event = {}) {
      this.$emit('close', event);
    }
  }
};
</script>

<style lang="scss" scoped></style>
