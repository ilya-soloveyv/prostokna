import Vue from 'vue';

export default {
  name: 'Brand',
  data() {
    return {
      brands: [],
      countrys: [],
      brand_index: false,
      active: false
    };
  },
  created: function() {
    this.get();
  },
  methods: {
    get: function() {
      axios.post('/admin/BrandList').then(responce => {
        this.brands = responce.data.brand;
        this.countrys = responce.data.country;
      });
    },
    use: function(index) {
      Vue.set(this, 'brand_index', index);
    },
    add: function() {
      var index = this.brands.push({});
      console.log(index);
      Vue.set(this, 'brand_index', index - 1);
    },
    submit: function() {
      axios
        .post('/admin/BrandUpdate', {
          brand: this.brands[this.brand_index]
        })
        .then(responce => {
          if (responce.data.brand) {
            Vue.set(this.brands, this.brand_index, responce.data.brand);
            $('#status').removeClass('d-none');
            setTimeout("$('#status').addClass('d-none')", 1000);
          }
        });
    }
  },
  template: `
        <div class="main-content">

            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <button class="btn btn-primary" data-toggle="modal" data-target="#brandEdit" v-on:click="add">Добавить</button>
                    </div>
                </div>
                <div class="col-auto" style="width: 260px;">
                    <div class="form-group">
                        <div class="custom-control custom-switch custom-switch-iActive">
                            <input type="checkbox" id="active" class="custom-control-input" v-model="active">
                            <label for="active" class="custom-control-label" style="line-height: 24px;">
                                <template v-if="active == 1">Скрыть неактивные бренды</template>
                                <template v-else>Показать неактивные бренды</template>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <ul class="list-group">
                <template v-for="brand, index in brands">
                    <li class="list-group-item" data-toggle="modal" data-target="#brandEdit" v-if="brand.iBrandID && ((active == false && brand.iActive == 1) || (active == true))" @click="use(index)">
                        <div class="row">
                            <div class="col-6">
                                <template v-if="brand.sBrandTitle">
                                    {{ brand.sBrandTitle }}
                                </template>
                                <template v-else>
                                    <span class="text-black-50">Без названия</span>
                                </template>
                            </div>
                            <div class="col-6">
                                <template v-if="brand.country">
                                    {{ brand.country.sCountryTitle }}
                                </template>
                            </div>
                        </div>
                    </li>
                </template>
            </ul>

            <div class="modal" tabindex="-1" role="dialog" id="brandEdit">
                <div class="modal-dialog modal-dialog-centered" role="document" v-if="brand_index !== false">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <template v-if="brands[brand_index].sBrandTitle">{{ brands[brand_index].sBrandTitle }}</template>
                                <template v-else><span class="text-black-50">Новая запись</span></template>
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form v-on:submit.prevent="submit">
                                <div class="form-group">
                                    <label for="sBrandTitle">Название</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="sBrandTitle"
                                        v-model="brands[brand_index].sBrandTitle"
                                        required>
                                </div>
                                <div class="form-group">
                                    <label for="sBrandURI">URI</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="sBrandTitle"
                                        v-model="brands[brand_index].sBrandURI"
                                        disabled>
                                        <small id="emailHelp" class="form-text text-muted">Генерируется автоматически</small>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="iCountryID">Страна производитель</label>
                                            <select class="form-control" id="iCountryID" v-model="brands[brand_index].iCountryID" required>
                                                <option v-for="country in countrys" :value="country.iCountryID">{{ country.sCountryTitle }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="iActive">Публикация:</label>
                                            <div class="custom-control custom-switch custom-switch-iActive mt-2 mb-2">
                                                <input type="checkbox" id="iActive" class="custom-control-input" v-model="brands[brand_index].iActive">
                                                <label for="iActive" class="custom-control-label">
                                                    <template v-if="brands[brand_index].iActive == 1">Опубликовано</template>
                                                    <template v-else>Скрыто</template>                                                            
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="sBrandDesc">Описание</label>
                                    <textarea class="form-control" id="sBrandDesc" rows=10 v-model="brands[brand_index].sBrandDesc"></textarea>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <button type="submit" class="btn btn-success">Сохранить</button>
                                    </div>
                                    <div class="col-6">
                                        <div id="status" class="mt-2 float-right d-none">Успешно сохранено</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};
