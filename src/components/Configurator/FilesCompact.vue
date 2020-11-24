<template>
  <div class="files">
    <input
      type="file"
      name="uploadFile"
      id="uploadFile"
      ref="uploadFile"
      @change="onFilesAdd"
    />
    <label for="uploadFile">
      <img class="attached-icon" :src="attachedIcon" />
    </label>
  </div>
</template>

<script>
import attachedIcon from '@images/configurator/attached-icon.svg';

export default {
  name: 'Files',
  data() {
    return { attachedIcon };
  },
  computed: {
    files() {
      return this.$store.state.configurator.files;
    }
  },
  methods: {
    storeFile(file) {
      this.$store.commit('configurator/addFile', file);
    },
    onFilesAdd() {
      const files = this.$refs.uploadFile.files;

      for (const file of files) {
        this.storeFile(file);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

input[type='file'] {
  display: none;

  & + label {
    position: relative;
    width: 100%;
    height: 36px;
    padding: 10px 28px;
    border-radius: 18px;
    background-color: #2f2f2f;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    transition: transform $transition;
    cursor: pointer;

    &:hover {
      transform: scale(1.05);
    }
    &:active {
      transform: scale(0.95);
    }
  }
}
</style>
