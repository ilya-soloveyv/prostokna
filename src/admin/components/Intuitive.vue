<template>
  <div class="intuitive">
    <div class="wrapType">
      <div class="title">
        <div class="desc">Тип установки</div>
        <div class="button" @click="openModalType()">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#007BFF" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          </span>
        </div>
      </div>
      <ul class="list">
        <li v-for="(type, index) in types" :key="index" :class="{ active: iIntuitiveTypeID === type.iIntuitiveTypeID }">
          <label>
            <input type="radio" name="types" :value="type.iIntuitiveTypeID" v-model="iIntuitiveTypeID" />
            {{ type.sIntuitiveTypeTitle }}
          </label>
          <span @click="openModalType(type.iIntuitiveTypeID)">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="bevel"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </span>
          <span @click="deleteType(type.iIntuitiveTypeID)">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="bevel"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </span>
        </li>
      </ul>
    </div>
    <div class="wrapQuestion">
      <div class="title">
        <div class="desc">Вопросы</div>
        <div class="button" @click="openModalQuestion()" v-if="iIntuitiveTypeID">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#007BFF" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          </span>
        </div>
      </div>
      <ul class="list">
        <li v-for="(question, index) in selectedQuestion" :key="index" :class="{ active: iIntuitiveQuestionID === question.iIntuitiveQuestionID }">
          <label>
            <input type="radio" name="questions" :value="question.iIntuitiveQuestionID" v-model="iIntuitiveQuestionID" />
            {{ question.sIntuitiveQuestionTitle }}
          </label>
          <span @click="openModalQuestion(question.iIntuitiveQuestionID)">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="bevel"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </span>
          <span @click="deleteQuestion(question.iIntuitiveQuestionID)">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="bevel"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </span>
        </li>
      </ul>
    </div>
    <div class="wrapAnswer">
      <div class="title">
        <div class="desc">Ответы</div>
        <div class="button" @click="openModalAnswer()" v-if="iIntuitiveQuestionID">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#007BFF" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          </span>
        </div>
      </div>
      <ul class="list">
        <li v-for="(answer, index) in selectedAnswer" :key="index" :class="{ active: iIntuitiveAnswerID === answer.iIntuitiveAnswerID }">
          <label>
            <input type="radio" name="answers" :value="answer.iIntuitiveAnswerID" v-model="iIntuitiveAnswerID" />
            {{ answer.sIntuitiveAnswerTitle }}
          </label>
          <span @click="openModalAnswer(answer.iIntuitiveAnswerID)">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="bevel"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </span>
          <span @click="deleteAnswer(answer.iIntuitiveAnswerID)">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="bevel"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </span>
        </li>
      </ul>
    </div>
    <div class="wrapProduct">
      <div class="title">
        <div class="desc">Окна</div>
      </div>
      <ul v-if="iIntuitiveAnswerID">
        <li v-for="(product, index) in products" :key="index">
          <div class="custom-control custom-switch">
            <input
              type="checkbox"
              :id="'product_' + product.iProductID"
              class="custom-control-input"
              :value="product.iProductID"
              v-model="productsID"
              @change="toggleAnswerProduct"
            />
            <label :for="'product_' + product.iProductID" class="custom-control-label">{{ product.brand.sBrandTitle }} {{ product.sProductTitle }}</label>
          </div>
        </li>
      </ul>
    </div>
    <modal-intuitive-type-edit ref="modalIntuitiveTypeEdit" @reload="get()" />
    <modal-intuitive-question-edit ref="modalIntuitiveQuestionEdit" @reload="get()" :iIntuitiveTypeID="iIntuitiveTypeID" />
    <modal-intuitive-answer-edit ref="modalIntuitiveAnswerEdit" @reload="get()" :iIntuitiveQuestionID="iIntuitiveQuestionID" />
  </div>
</template>

<script>
import modalIntuitiveTypeEdit from './intuitive/modalIntuitiveTypeEdit.vue'
import modalIntuitiveQuestionEdit from './intuitive/modalIntuitiveQuestionEdit.vue'
import modalIntuitiveAnswerEdit from './intuitive/modalIntuitiveAnswerEdit.vue'
export default {
  name: 'Intuitive',
  components: {
    modalIntuitiveTypeEdit,
    modalIntuitiveQuestionEdit,
    modalIntuitiveAnswerEdit
  },
  data() {
    return {
      types: [],
      question: [],
      answer: [],
      products: [],
      answer_products: [],
      productsID: [],
      iIntuitiveTypeID: 1,
      iIntuitiveQuestionID: 1,
      iIntuitiveAnswerID: 1,
      // iIntuitiveTypeID: null,
      // iIntuitiveQuestionID: null,
      // iIntuitiveAnswerID: null,
    };
  },
  created() {
    this.get()
  },
  watch: {
    iIntuitiveTypeID() {
      this.iIntuitiveQuestionID = null
      this.iIntuitiveAnswerID = null
    },
    iIntuitiveQuestionID() {
      this.iIntuitiveAnswerID = null
    },
    iIntuitiveAnswerID() {
      this.productsID = this.answer_products.filter(item => item.iIntuitiveAnswerID === this.iIntuitiveAnswerID).map(item => item.iProductID)
    }
  },
  computed: {
    selectedQuestion() {
      return this.question.filter(x => x.iIntuitiveTypeID === this.iIntuitiveTypeID)
    },
    selectedAnswer() {
      return this.answer.filter(x => x.iIntuitiveQuestionID === this.iIntuitiveQuestionID)
    },
  },
  methods: {
    get() {
      axios.get('/admin/intuitive/list', {}).then(response => {
        this.types = response.data.types;
        this.question = response.data.question;
        this.answer = response.data.answer;
        this.products = response.data.products;
        this.answer_products = response.data.answer_products;
      });
    },
    openModalType(iIntuitiveTypeID = null) {
      this.$refs.modalIntuitiveTypeEdit.open(iIntuitiveTypeID)
    },
    deleteType(iIntuitiveTypeID = null) {
      if (confirm('Подтверждаете удаление?')) {
        axios.post('/admin/intuitive/deleteType', {
          iIntuitiveTypeID
        }).then(response => {
          this.get()
        })
      }
    },
    openModalQuestion(iIntuitiveQuestionID = null) {
      this.$refs.modalIntuitiveQuestionEdit.open(iIntuitiveQuestionID)
    },
    deleteQuestion(iIntuitiveQuestionID = null) {
      if (confirm('Подтверждаете удаление?')) {
        axios.post('/admin/intuitive/deleteQuestion', {
          iIntuitiveQuestionID
        }).then(response => {
          this.get()
        })
      }
    },
    openModalAnswer(iIntuitiveAnswerID = null) {
      this.$refs.modalIntuitiveAnswerEdit.open(iIntuitiveAnswerID)
    },
    deleteAnswer(iIntuitiveAnswerID = null) {
      if (confirm('Подтверждаете удаление?')) {
        axios.post('/admin/intuitive/deleteAnswer', {
          iIntuitiveAnswerID
        }).then(response => {
          this.get()
        })
      } 
    },
    toggleAnswerProduct() {
      axios.post('/admin/intuitive/getAnswerProducts', {
        iIntuitiveAnswerID: this.iIntuitiveAnswerID,
        productsID: this.productsID
      }).then(response => {
        this.answer_products = response.data.answer_products
        // console.log(response)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.intuitive {
  height: calc(100% + 4rem);
  margin: -2rem;
  gap: 1px;
  background-color: #DDDDDD;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 250px 250px 250px 1fr;
  .title {
    height: 30px;
    margin: 0 0 1rem;
    font-size: 16px;
    opacity: 0.85;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    .desc {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .button {
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      svg {
        display: block;
      }
    }
  }
  ul.list {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      display: flex;
      height: 30px;
      &.active {
        label {
          font-weight: bold;
          color: black;
        }
      }
      label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 1;
        line-height: 30px;
        height: 100%;
        color: #007bff;
        cursor: pointer;
        margin: 0;
        input {
          display: none;
        }
      }
      span {
        flex-shrink: 0;
        flex-basis: 30px;
        // background-color: orchid;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        svg {
          opacity: .25;
        }
      }
    }
  }
  .wrapType,
  .wrapQuestion,
  .wrapAnswer,
  .wrapProduct {
    padding: 1rem;
    overflow: hidden;
    background-color: #F9F9F9;
  }
  .wrapType {
  }
  .wrapQuestion {
    background-color: #f0f0f0;
  }
  .wrapAnswer {
  }
  .wrapProduct {
    background-color: #f0f0f0;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        padding: 3px 0 3px;
      }
    }
  }
}
</style>