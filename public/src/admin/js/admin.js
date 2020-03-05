import App from '../components/App.js'
import Product from '../components/Product.js'
import ProductList from '../components/ProductList.js'
import ProductEdit from '../components/ProductEdit.js'
import Material from '../components/Material.js'
import Brand from '../components/Brand.js'
import Color from '../components/Color.js'
import Gallery from '../components/Gallery.js'
import Part from '../components/part/Part.js'
// import PartList from '../components/part/PartList.js'
// import PartHandle from '../components/part/handle/PartHandle.js'
// import PartCurtain from '../components/PartCurtain.js'
// import PartJalousie from '../components/PartJalousie.js'
// import PartGrid from '../components/PartGrid.js'
// import PartSill from '../components/PartSill.js'
// import PartValve from '../components/PartValve.js'

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
    // {
    //     path: '/part',
    //     component: Part,
    //     children: [
    //         {
    //             path: '',
    //             component: PartList
    //         },
    //         {
    //             path: 'handle',
    //             component: PartHandle
    //         },
    //         {
    //             path: 'curtain',
    //             component: PartCurtain,
    //         },
    //         {
    //             path: 'jalousie',
    //             component: PartJalousie,
    //         },
    //         {
    //             path: 'grid',
    //             component: PartGrid,
    //         },
    //         {
    //             path: 'sill',
    //             component: PartSill,
    //         },
    //         {
    //             path: 'valve',
    //             component: PartValve,
    //         },
    //     ]
    // },
    {
        path: '/part',
        component: Part,
        props: true,
        children: [
            {
                path: ':iPartID',
                component: Part,
                props: true,
                children: [
                    {
                        path: ':iPartBrandID',
                        component: Part,
                        props: true,
                        children: [
                            {
                                path: ':iPartModelID',
                                component: Part,
                                props: true,
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

const router = new VueRouter({ routes })
const app = new Vue({
    router,
    render: h => h(App, {
        props: {},
    })
}).$mount('#app')
