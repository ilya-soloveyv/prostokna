export default {
    name: 'Product',
    data: function () {
        return {
            product: []
        }
    },
    created: function () {
        this.get()
    },
    methods: {
        get: function () {
            axios.post('/admin/ProductList').then((responce) => {
                this.product = responce.data.product
            })
        }
    },
    template: `
        <div>
            <div class="form-group" v-if="product.length > 0">
                <div class="list-group">
                    <router-link class="list-group-item list-group-item-action" v-for="(product, index) in product" :key="index" :to="'/product/' + product.iProductID">
                        #{{ product.iProductID }} | 
                        <template v-if="product.brand">
                            {{ product.brand.sBrandTitle }} {{ product.sProductTitle }}
                        </template>
                        <template v-else>
                            {{ product.sProductTitle }}
                        </template>
                    </router-link>
                </div>
            </div>
            <router-link class="btn btn-primary" to="/product/create">Добавить</router-link>
        </div>
    `,
}
