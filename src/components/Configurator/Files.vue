<template>
  <div class="files">
    <div class="title" v-if="files.length">Прикрепленные файлы:</div>
    <ul class="file-list" v-if="files.length">
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
    <input
      type="file"
      name="uploadFile"
      id="uploadFile"
      ref="uploadFile"
      @change="onFilesAdd"
    />
    <label for="uploadFile">
      Добавить файл <img class="attached-icon" :src="attachedIcon" />
    </label>
  </div>
</template>

<script>
/**
 * Icons
 */
import deleteIcon from '@images/configurator/delete-icon.svg';
import attachedIcon from '@images/configurator/attached-icon.svg';

export default {
  name: 'Files',
  data() {
    return { deleteIcon, attachedIcon };
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
    removeFile(index) {
      if (window.confirm('Удалить файл?')) {
        this.$store.commit('configurator/removeFile', index);
      }
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

.files {
  margin-bottom: 22px;
}

.title {
  padding: 10px 28px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

input[type='file'] {
  display: none;

  & + label {
    position: relative;
    width: 175px;
    height: 36px;
    padding: 10px 28px;
    border-radius: 18px;
    background-color: #2f2f2f;
    font-size: 12px;
    font-weight: 500;
    transition: transform $transition;
    cursor: pointer;

    .attached-icon {
      position: absolute;
      right: 28px;
    }

    &:hover {
      transform: scale(1.05);
    }
    &:active {
      transform: scale(0.95);
    }
  }
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
    }
  }
}
</style>
