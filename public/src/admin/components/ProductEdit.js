export default {
    name: 'ProductEdit',
    components: {
        'picture-input': PictureInput,
    },
    props: [
        'iProductID'
    ],
    data () {
        return {
            brand: [],
            brus: [],
            material: [],
            color: [],
            products: [],
            product: {
                product_images: [],
                iActive: 1
            },
            product_link: [],
            attachment: {},
            product_links: 0
        }
    },
    created: function () {
        this.get()
    },
    methods: {
        get: function () {
            axios.post('/admin/ProductEdit', {
                iProductID: this.iProductID
            }).then((responce) => {
                this.brand = responce.data.brand
                this.brus = responce.data.brus
                this.material = responce.data.material
                this.color = responce.data.color
                this.products = responce.data.products
                if (responce.data.product) {
                    this.product = responce.data.product
                }                
            })
        },
        changeImageOnPage: function (index) {
            var check = this.product.product_images[index].iPhotoInDescOnPage
            console.log(check)
            this.product.product_images.forEach((image, i) => {
                if (index != i) {
                    Vue.set(this.product.product_images[i], 'iPhotoInDescOnPage', false)
                }
            })
        },
        update: function () {
            axios.post('/admin/ProductUpdate', {
                product: this.product
            }).then((responce) => {
                this.product = responce.data.product
                this.$router.push('/product/' + this.product.iProductID)
            })
        },
        del: function () {
            axios.post('/admin/ProductDelete', {
                product: this.product
            }).then((responce) => {
                this.$router.push('/product');
            })
        },
        addImage: function () {
            this.product.product_images.push({
                iOrder: 99
            })
        },
        addImageColor: function () {
            this.product.product_colors.push({})
        },
        removeImage: function (index) {
            Vue.set(this.product.product_images[index], 'del', true)
        },
        removeImageColor: function (index) {
            Vue.set(this.product.product_colors[index], 'del', true)
        },
        upload: function (event) {
            var form = new FormData();
            var index = event.target.getAttribute('image_index')
            var column = event.target.getAttribute('image_type')
            form.append('file', event.target.files[0]);
            axios.post('/admin/upload', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'extension': event.target.files[0].name.split('.').pop()
                }
            }).then( (response) => {
                Vue.set(this.product.product_images[index], column, response.data.filename)
            })
        },
        uploadColor: function (event) {
            var form = new FormData();
            form.append('file', event.target.files[0]);
            var index = event.target.name
            axios.post('/admin/ProductUploadColor', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'extension': event.target.files[0].name.split('.').pop()
                }
            }).then( (response) => {
                Vue.set(this.product.product_colors[index], 'sProductColorFilename', response.data.filename)
            })
        },
        useProductLink: function () {
            this.product.product_links.push({
                iProductLinkID: false,
                iProductIDFrom: this.product.iProductID,
                iProductIDTo: this.product_links.iProductID,
                product: {
                    sProductTitle: this.product_links.sProductTitle,
                    iGenerateUriMaterial: this.product_links.iGenerateUriMaterial,
                    iGenerateUriBrus: this.product_links.iGenerateUriBrus,
                    brand: {
                        sBrandTitle: this.product_links.brand.sBrandTitle,
                    },
                    material: {
                        sMaterialTitle: this.product_links.material.sMaterialTitle,
                    },
                    bru: {
                        sBrusTitle: (this.product_links.bru !== null) ? this.product_links.bru.sBrusTitle : false,
                    },
                }
            })
            Vue.set(this, 'product_links', 0)
        },
        delProductLink: function (index) {
            Vue.set(this.product.product_links[index], 'del', true)
        },
        uploadPlan: function () {

        }
    },
    template: `
        <div class="ProductEdit">
            <form action="#" method="POST" @submit.prevent="update">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">Основные данные</div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4">
                                        <div class="form-group mb-0">
                                            <label class="label" for="">Галлерея:</label>
                                            <div v-for="(image, index) in product.product_images" v-if="image.del !== true" class="mb-3">
                                                <div class="row mb-1">
                                                    <div class="col">
                                                        <picture-input
                                                            ref="planImage"
                                                            @change="uploadPlan"
                                                            :crop="false"
                                                            accept="image/jpeg,image/png,image/svg+xml,image/svg"
                                                            size="10"
                                                            buttonClass="btn btn-primary btn-sm"
                                                            :hideChangeButton='true'
                                                            v-bind:prefill="(image.sProductImageFrontName) ? '/images/product/gallery/'+image.sProductImageFrontName : ''"
                                                            :customStrings="{
                                                                drag: 'Перетащите изображение или нажмите для выбора файла'
                                                            }"></picture-input>
                                                    </div>
                                                    <div class="col">
                                                        <picture-input
                                                            ref="planImage"
                                                            @change="uploadPlan"
                                                            :crop="false"
                                                            accept="image/jpeg,image/png,image/svg+xml,image/svg"
                                                            size="10"
                                                            buttonClass="btn btn-primary btn-sm"
                                                            :hideChangeButton='true'
                                                            v-bind:prefill="(image.sProductImageBackName) ? '/images/product/gallery/'+image.sProductImageBackName : ''"
                                                            :customStrings="{
                                                                drag: 'Перетащите изображение или нажмите для выбора файла'
                                                            }"></picture-input>
                                                        <label class="file_upload">
                                                            <input type="file" :name="'back[' + index + ']'" :image_type="'sProductImageBackName'" :image_index="index" @change="upload" />
                                                            <img v-if="image.sProductImageBackName" :src="'/images/product/gallery/' + image.sProductImageBackName" />
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="row pb-1">
                                                    <div class="col">
                                                        <div class="custom-control custom-switch">
                                                            <input type="checkbox" class="custom-control-input" :id="'iPhotoInDescOnPage' + index" v-model="image.iPhotoInDescOnPage" v-on:change="changeImageOnPage(index)">
                                                            <label class="custom-control-label" :for="'iPhotoInDescOnPage' + index">Вывод изображения в тексте</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <button type="button" class="btn btn-sm bg-light" v-on:click="removeImage(index)">del</button>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="form-group row">
                                                            <label class="col-sm-6 label col-form-label col-form-label-sm">Сортировка</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" class="form-control form-control-sm" v-model="image.iOrder">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button class="btn btn-primary btn-sm" type="button" v-on:click="addImage()">Добавить фотографии</button>
                                    </div>
                                    <div class="col-8">
                                        <div class="row">
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label class="label" for="">Производитель:</label>
                                                    <select v-model.number="product.iBrandID" class="form-control" required>
                                                        <option v-for="(brand, index) in brand" :key="brand.iBrandID" :value="brand.iBrandID">{{ brand.sBrandTitle }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label class="label" for="">Наименование модели:</label>
                                                    <input type="text" class="form-control" v-model="product.sProductTitle" required>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label class="label" for="">URI:</label>
                                                    <input type="text" class="form-control" v-model="product.sProductURI" disabled>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label class="label" for="">Материал:</label>
                                                    <label class="float-right text-muted">URI <input type="checkbox" v-model="product.iGenerateUriMaterial" :disabled="!product.iMaterialID"></label>
                                                    <select v-model.number="product.iMaterialID" class="form-control" required>
                                                        <option v-for="(material, index) in material" :key="material.iMaterialID" :value="material.iMaterialID">{{ material.sMaterialTitle }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label class="label" for="">Выбор бруса:</label>
                                                    <label class="float-right text-muted">URI <input type="checkbox" v-model="product.iGenerateUriBrus" :disabled="!product.iBrusID"></label>
                                                    <select v-model.number="product.iBrusID" class="form-control">
                                                        <option :value="null">...</option>
                                                        <option v-for="(brus, index) in brus" :key="brus.iBrusID" :value="brus.iBrusID">{{ brus.sBrusTitle }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label class="label" for="">Цена от:</label>
                                                    <input type="text" class="form-control" v-model="product.iPrice">
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label class="label" for="">Публикация:</label>
                                                    <div class="custom-control custom-switch custom-switch-iActive">
                                                        <input type="checkbox" id="iActive" class="custom-control-input" v-model="product.iActive">
                                                        <label for="iActive" class="custom-control-label">
                                                            <template v-if="product.iActive == 1">Опубликовано</template>
                                                            <template v-else>Скрыто</template>                                                            
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>                                            
                                        </div>
                                        <div class="row">
                                            <div class="col-12">                                                
                                                <label class="label" for="" style="color:#ADB5BD">Перелинковка по материалу и брусу:</label>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <template v-for="(item, index) in product.product_links">
                                                            <span v-if="!item.del" class="badge badge-product-link-item badge-pill badge-primary p-2 pl-3 mb-2 mr-2">
                                                                {{ item.product.brand.sBrandTitle }} {{ item.product.sProductTitle }}
                                                                <template v-if="item.product.iGenerateUriMaterial">
                                                                    {{ item.product.material.sMaterialTitle }}
                                                                </template>
                                                                <template v-if="item.product.iGenerateUriBrus">
                                                                    {{ item.product.bru.sBrusTitle }}
                                                                </template>
                                                                <i class="material-icons" v-on:click="delProductLink(index)">clear</i>
                                                            </span>
                                                        </template>
                                                        <select v-on:change="useProductLink" v-model="product_links" class="badge badge-product-link-item badge-pill badge-light mb-3 mr-2" title="Выбрать товар" width="200px">
                                                            <option value=0>Выбрать товар</option>
                                                            <option v-for="(item, index) in products" :value="item">
                                                                {{ item.brand.sBrandTitle }} {{ item.sProductTitle }}
                                                                <template v-if="item.iGenerateUriMaterial">
                                                                    {{ item.material.sMaterialTitle }}
                                                                </template>
                                                                <template v-if="item.iGenerateUriBrus">
                                                                    {{ item.bru.sBrusTitle }}
                                                                </template>
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-2">
                                                <div class="form-group">
                                                    <label class="label" for="">Теплоизоляция:</label>
                                                    <input type="text" class="form-control" v-model.number="product.iProductParam1">
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div class="form-group">
                                                    <label class="label" for="">Шумоизоляция:</label>
                                                    <input type="text" class="form-control" v-model.number="product.iProductParam2">
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div class="form-group">
                                                    <label class="label" for="">Безопастность:</label>
                                                    <input type="text" class="form-control" v-model.number="product.iProductParam3">
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div class="form-group">
                                                    <label class="label" for="">Эстетичность:</label>
                                                    <input type="text" class="form-control" v-model.number="product.iProductParam4">
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div class="form-group">
                                                    <label class="label" for="">Экологичность:</label>
                                                    <input type="text" class="form-control" v-model.number="product.iProductParam5">
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div class="form-group">
                                                    <label class="label" for="">Цена:</label>
                                                    <input type="text" class="form-control" v-model.number="product.iProductParam6">
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label class="label" for="">Монтажная глубина:</label>
                                                    <input type="text" class="form-control" v-model.number="product.MountingDepth">
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label class="label" for="">Стеклопакет:</label>
                                                    <input type="text" class="form-control" v-model="product.Profile">
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label class="label" for="">Класс профиля:</label>
                                                    <input type="text" class="form-control" v-model="product.ProfileClass">
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label class="label" for="">Кол-во камер:</label>
                                                    <input type="text" class="form-control" v-model.number="product.DoubleGlazing">
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label class="label" for="">Сопротивление теплопередаче:</label>
                                                    <input type="text" class="form-control" v-model="product.HeatTransferResistance">
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label class="label" for="">Выбор формы штапика:</label>
                                                    <input type="text" class="form-control" v-model="product.ShapikShapeOptions">
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label class="label" for="">Варианты декорирования:</label>
                                                    <input type="text" class="form-control" v-model="product.DecorationOptions">
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label class="label" for="">Особенности профиля створки:</label>
                                                    <input type="text" class="form-control" v-model="product.FrameFeature">
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label class="label" for="">Краткое описание:</label>
                                                    <input type="text" class="form-control" v-model="product.sProductDesc">
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group mb-0">
                                                    <label class="label" for="">Описание:</label>
                                                    <textarea class="form-control" rows="13" v-model="product.sProductText"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="card card-color">
                            <div class="card-header">Цвета</div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-2 mb-3" v-for="(item, index) in product.product_colors" v-if="item.del !== true">
                                        <div class="row">
                                            <div class="col col-12">
                                                <label class="file_upload mb-3">
                                                    <input type="file" :name="index" @change="uploadColor" />
                                                    <img v-if="item.sProductColorFilename" :src="'/images/product/color/' + item.sProductColorFilename" />
                                                    <button type="button" class="btn btn-sm bg-light" v-on:click="removeImageColor(index)">del</button>
                                                </label>
                                            </div>
                                            <div class="col">
                                                <select v-model="item.iColorID" class="form-control form-control-sm">
                                                    <option v-for="(color, index) in color" :value="color.iColorID" v-show="product.iMaterialID == color.iMaterialID">{{ color.sColorTitleCode }} - {{ color.sColorTitle }}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-sm btn-primary" v-on:click="addImageColor">Добавить цвет товара</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-success">Сохранить</button>
                <button type="button" class="btn btn-danger float-right" v-on:click.prevent="del">Удалить</button>
            </form>
        </div>
    `,
}
