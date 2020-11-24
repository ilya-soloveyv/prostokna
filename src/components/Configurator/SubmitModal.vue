<template>
  <div class="submit-modal" @mouseup="onBackdropClick">
    <div class="submit-form" v-if="submitState === null">
      <div class="body" ref="body">
        <div class="close-cross" @click="closeEvent">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-x"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
        <div class="form-items">
          <label for="submit-modal-name" :class="{ error: nameHasError }">
            Имя <sup>*</sup>
            <input
              type="text"
              id="submit-modal-name"
              v-model="name"
              @input="nameHasError = false"
              @blur="nameHasError = !isNameValid"
            />
          </label>

          <label for="submit-modal-phone" :class="{ error: phoneHasError }">
            Телефон <sup>*</sup>
            <input
              type="text"
              id="submit-modal-phone"
              ref="inputPhone"
              v-model="phone"
              @input="phoneHasError = false"
              @blur="phoneHasError = !isPhoneValid"
            />
          </label>

          <label for="submit-modal-comment">
            Комментарий
            <textarea
              name=""
              id="submit-modal-comment"
              v-model="comment"
            ></textarea>
          </label>
        </div>
      </div>

      <div
        class="button"
        ref="submit"
        @click="submit"
        @mouseup="e => e.stopPropagation()"
      >
        Отправить
      </div>
    </div>
    <div class="submit-status" v-if="submitState === 'pending'">
      <SubmitSpinner />
    </div>
    <div class="submit-status" v-if="submitState === 'resolved'">
      <b>Заявка успешно отправлена.</b>
      <p>
        Номер заявки
        {{ $store.state.configurator.requestId }}
      </p>
      <div class="button" @click="copyRequestId">
        Копировать номер заявки
      </div>
    </div>
    <div class="submit-status" v-if="submitState === 'rejected'">
      <b>Ошибка при отправке заявки!</b>
      <p>
        Проверьте подключение к интернету и повторите попытку.
      </p>
      <div class="button" @click="okayOnError">
        Понятно
      </div>
    </div>
  </div>
</template>

<script>
import Inputmask from 'inputmask';
import copy from 'clipboard-copy';

import SubmitSpinner from './common/SubmitSpinner.vue';

export default {
  name: 'SubmitModal',
  components: { SubmitSpinner },
  data() {
    return {
      name: this.$store.state.configurator.name,
      phone: this.$store.state.configurator.phone,
      comment: this.$store.state.configurator.comment,
      phoneInputMask: null,
      nameHasError: false,
      phoneHasError: false
    };
  },
  watch: {
    name() {
      this.$store.commit('configurator/setState', { name: this.name });
    },
    phone() {
      this.$store.commit('configurator/setState', { phone: this.phone });
    },
    comment() {
      this.$store.commit('configurator/setState', { comment: this.comment });
    }
  },
  computed: {
    submitState() {
      return this.$store.state.configurator.submitState;
    },
    isNameValid() {
      return this.name.length > 0 && this.name.length < 200;
    },
    isPhoneValid() {
      return this.phoneInputMask?.isComplete();
    },
    currentProduct() {
      return this.$store.getters['configurator/currentProduct'];
    }
  },
  methods: {
    copyRequestId() {
      copy(this.$store.state.configurator.requestId);

      this.closeEvent();
      this.$store.dispatch('configurator/reset');
    },
    okayOnError() {
      this.closeEvent();
      this.$store.commit('configurator/setState', { submitState: null });
    },
    submit(e) {
      if (!this.validate()) return;
      this.$store.dispatch('configurator/submit');
    },
    validate() {
      this.nameHasError = !this.isNameValid;
      this.phoneHasError = !this.isPhoneValid;

      return this.isNameValid && this.isPhoneValid;
    },
    onBackdropClick(e) {
      if (this.submitState !== null) return;

      const path = e.composedPath();
      if (!path.includes(this.$refs.body)) {
        this.closeEvent(e);
      }
    },
    closeEvent(event = {}) {
      this.$emit('close', event);
    }
  },
  mounted() {
    this.phoneInputMask = new Inputmask({ mask: '+7 (999) 999-99-99' }).mask(
      this.$refs.inputPhone
    );
  }
};
</script>

<style lang="scss" scoped>
@import '@scss/variables';
@import '@scss/mixins/scrollbar';

.submit-modal {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(#000, 0.5);
  z-index: 100;
}

.submit-form,
.submit-status {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 105;

  animation: 0.25s forwards scaleBody;

  @keyframes scaleBody {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
}

.close-cross {
  margin-top: -0.5em;
  margin-right: -0.5em;
  margin-bottom: -1.5em;
  color: $light;
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  opacity: 0.5;
  transition: opacity $transition;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
}

.body {
  position: relative;
  width: 600px;
  max-width: 97.5%;
  padding: 28px;
  border-radius: 8px;
  background: $gray-darker;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);

  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -35px;
    height: 35px;
  }
}

label {
  width: 100%;
  margin: 18px 32px 0;
  font-size: 14px;
  font-weight: 400;
  color: rgba($light, 0.25);
  transition: color $transition;

  &:focus-within {
    color: $light;
  }

  &.error {
    color: crimson;
  }
}

input[type='text'],
textarea {
  width: 100%;
  padding: 12px 32px;
  margin: 4px 0 0 -32px;
  background: transparent;
  border: 1px solid;
  border-color: $border-dark;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  color: $light;
  box-shadow: none;
  transition: border-color $transition;

  &:hover,
  &:focus {
    border-color: rgba($light, 0.6);
  }

  .error & {
    border-color: crimson;
  }

  // @include scrollbar;
}

.button {
  padding: 11px 50px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  background: $accent-1;
  background-image: linear-gradient(to left, #d165e9 100%, #bf87f0 0%);
  border-radius: 45px;
  transition: transform $transition;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  .submit-form & {
    margin-top: 35px;
  }
}
</style>
