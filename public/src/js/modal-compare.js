$(document).ready(function(){
  // $("#openModalCompare").click();
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
    })

  },
  methods: {
    makeCompare: function() {
      this.comparePage = true;
      console.log('makeCompare ', this.comparePage);
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