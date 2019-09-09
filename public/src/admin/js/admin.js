import App from '../components/App.js'
import Product from '../components/Product.js'
import ProductList from '../components/ProductList.js'
import ProductEdit from '../components/ProductEdit.js'
import Material from '../components/Material.js'
import Brand from '../components/Brand.js'
import Color from '../components/Color.js'
import Gallery from '../components/Gallery.js'

const routes = [
    {
        path: '/',
        redirect: '/product'
    },
    {
        path: '/product',
        component: Product,
        children: [
            {
                path: '',
                component: ProductList
            },
            {
                path: 'create',
                component: ProductEdit,
            },
            {
                path: ':iProductID',
                component: ProductEdit,
                props: true
            },
        ]
    },
    {
        path: '/material',
        component: Material
    },
    {
        path: '/brand',
        component: Brand
    },
    {
        path: '/color',
        component: Color
    },
    {
        path: '/gallery',
        component: Gallery
    },
]

const router = new VueRouter({
    routes})

const app = new Vue({
    router,
    render: h => h(App, {
        props: {
            
        },
    })
}).$mount('#app')
