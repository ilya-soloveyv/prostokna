<template>
  <div class="files" v-if="files.length">
    <div class="title">Прикрепленные файлы:</div>
    <ul class="file-list">
      <li v-for="(file, index) of files" :key="file.id">
        <span>{{ file.name }}</span>
        <img
          :src="deleteIcon"
          class="remove"
          alt=""
          @click="() => removeFile(index)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * Icons
 */
import deleteIcon from '@images/configurator/delete-icon.svg';
import attachedIcon from '@images/configurator/attached-icon.svg';

export default {
  name: 'FileList',
  data() {
    return { deleteIcon };
  },
  computed: {
    files() {
      return this.$store.state.configurator.files;
    }
  },
  methods: {
    removeFile(index) {
      if (window.confirm('Удалить файл?')) {
        this.$store.commit('configurator/removeFile', index);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.files {
  margin-bottom: 22px;
}

.title {
  padding: 10px 28px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.file-list {
  padding: 0 14px;
  margin-bottom: 8px;
  li {
    position: relative;
    padding: 10px 14px;
    font-size: 12px;
    font-weight: 500;
    border-bottom: 0.5px dotted;
    border-color: $border-dark;

    &:last-child {
      border: none !important;
    }

    .remove {
      position: absolute;
      top: 12px;
      right: 0;
      height: 16px;
      cursor: pointer;

      .mobile & {
        right: 14px;
      }
    }
  }
}
</style>
