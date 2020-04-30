$(document).ready(function(){
  $("#openModalCompare").click();
});



const test = 111
// const MiniBarSelectionModel = new MiniBar('.selection-model')
// import Vuebar from 'vuebar';
// Vue.use(Vuebar);
console.log(Vuebar)

vm = new Vue({
  el: '#compareModal',
  data: {
    name: 'Vladimir',
    info: null,
    materials: null,
    products: [],
    iMaterialID: 1,
    selectedProducts: [],
    comparePage: false
  },
  created() {
  },
  computed: {
    result: function() {
      const brands = []
      // console.log('beg', this.products);
      const list = this.products.filter((product) => product.iMaterialID === this.iMaterialID)
      // console.log(list);
      list.forEach(product => {
        const check = brands.find(brand => brand.iBrandID === product.iBrandID)
        // console.log('list ');
        // console.log(check);
        if (!check) {
          const brand = Object.assign({}, product.brand);
          // console.log('1', brand);
          brand.products = [];
          // console.log('2', brand);
          brands.push(brand);
          // console.log('3',brands);
        }
        const productsList = brands.find(brand => brand.iBrandID === product.iBrandID)
        // console.log('pl', productsList)
        productsList.products.push(product)
      })
      // console.log('br', brands);

      // Vue.nextTick(function(){
      //   MiniBarSelectionModel.update();
      // })

      return brands
    },

    selectedListProducts: function() {
      var list = [];
      this.selectedProducts.forEach( selectedProduct => {
        list.push(this.products.find( (product) => product.iProductID === selectedProduct))
      });
      //console.log(list);
      return list;
    }
  },
  mounted() {
    axios.get('/compare').then(({data}) => {
      Vue.set(this, 'info', data);
      Vue.set(this,  'materials', data.material);
      Vue.set(this, 'products', data.product);
    });
    // MiniBarSelectionModel.update();
    Vue.nextTick(function(){
      $('#compareModal').on('shown.bs.modal', function (e) {
        // MiniBarSelectionModel.update();
        // console.log(this.MiniBarSelectionModel)
      }) 
      $(".owl-carousel").owlCarousel({
        nav: true,
        navText: [
            '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>'
        ],
        responsive:{
            0: {
                items:2
            },
            768: {
                items:3
            },
            1280: {
                items:4
            }
        },
        // onInitialized: () => {
        //     $('.s7 .owl-nav').prepend($('.s7 .owl-dots'))
        // }
      })
    })

  },
  methods: {
    makeCompare: function() {
      this.comparePage = true;
      console.log('makeCompare ', this.comparePage);
      console.log('selectedListProducts', this.selectedListProducts);
      console.log('selectedListProducts[0]', this.selectedListProducts[0].sProductTitle);
    },
    returnToSelection: function() {
      this.comparePage = false;
    },
    reloadMiniBar() {
      console.log(test)
      // Vue.nextTick(function(){
      //   new MiniBar('.selection-model').update();
      // })
    }
  }
})




$(document).on('click', '#compareModal ul.brand li span.brand', function() {
  $(this).parent().addClass('active').siblings().removeClass('active');
  // $(this).next().slideDown('fast').parent().siblings().find('ul.model').slideUp('fast');
  
  // $("#compareModal .selection-model ul.model").slideToggle('fast');

});

// $(document).on('click', '#compareModal ul.model li span.model', function() {
//   $(this).parent().toggleClass('active');
//   console.log('test');
// });



// $("#compareModal ul.brand li span.brand").on('click', function() {
//   $(".selection-model ul.model").slideToggle('fast');
//   console.log('asd');
// });

// $(".selection-model .list-products span.brand").on('click', function() {
//   $(".selection-model ul.model").hide();
// });



new MiniBar('#table-compare', {
  barType: "default",
  minBarSize: 10,
  hideBars: false,  /* v0.4.0 and above */
  alwaysShowBars: false,
  horizontalMouseScroll: false,

  scrollX: true,
  scrollY: true,

  navButtons: false,
  scrollAmount: 10,

  mutationObserver: {
      attributes: false,
      childList: true,
      subtree: true
  },

   /* v0.4.0 and above */
  onInit: function() {
  /* do something on init */
  },

   /* v0.4.0 and above */
  onUpdate: function() {
  /* do something on update */
  },

   /* v0.4.0 and above */
  onScroll: function() {
  /* do something on init */
  },

  classes: {
      container: "mb-container",
      content: "mb-content",
      track: "mb-track",
      bar: "mb-bar",
      visible: "mb-visible",
      progress: "mb-progress",
      hover: "mb-hover",
      scrolling: "mb-scrolling",
      textarea: "mb-textarea",
      wrapper: "mb-wrapper",
      nav: "mb-nav",
      btn: "mb-button",
      btns: "mb-buttons",
      increase: "mb-increase",
      decrease: "mb-decrease",
      item: "mb-item", /* v0.4.0 and above */
      itemVisible: "mb-item-visible", /* v0.4.0 and above */
      itemPartial: "mb-item-partial", /* v0.4.0 and above */
      itemHidden: "mb-item-hidden" /* v0.4.0 and above */
  }
});