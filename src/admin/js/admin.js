import Vue from 'vue';
import VueRouter from 'vue-router';

import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap-select/dist/js/bootstrap-select';

import App from '../components/App.js';
import Product from '../components/Product.js';
import ProductList from '../components/ProductList.js';
import ProductEdit from '../components/ProductEdit.js';
import Material from '../components/Material.js';
import Brand from '../components/Brand.js';
import Color from '../components/Color.js';
import Gallery from '../components/Gallery.js';
import Part from '../components/part/Part.js';
// import PartList from '../components/part/PartList.js'
// import PartHandle from '../components/part/handle/PartHandle.js'
// import PartCurtain from '../components/PartCurtain.js'
// import PartJalousie from '../components/PartJalousie.js'
// import PartGrid from '../components/PartGrid.js'
// import PartSill from '../components/PartSill.js'
// import PartValve from '../components/PartValve.js'
import Index from '../components/index/Index.js';
import Intuitive from '../components/Intuitive.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import '../sass/admin.scss';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/product',
  },
  {
    path: '/product',
    component: Product,
    children: [
      {
        path: '',
        component: ProductList,
      },
      {
        path: 'create',
        component: ProductEdit,
      },
      {
        path: ':iProductID',
        component: ProductEdit,
        props: true,
      },
    ],
  },
  {
    path: '/material',
    component: Material,
  },
  {
    path: '/brand',
    component: Brand,
  },
  {
    path: '/color',
    component: Color,
  },
  {
    path: '/gallery',
    component: Gallery,
  },
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
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/index',
    component: Index,
    props: true,
    children: [
      {
        path: ':section',
        component: Index,
        props: true,
        children: [
          {
            path: ':part',
            component: Index,
            props: true,
          },
        ],
      },
    ],
  },
  {
    path: '/intuitive',
    component: Intuitive,
    props: true,
  },
];

const router = new VueRouter({ routes });
const app = new Vue({
  router: router,
  render: (h) =>
    h(App, {
      props: {},
    }),
}).$mount('#app');
