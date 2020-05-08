$(document).ready(function(){
  // $("#openModalCompare").click();
});


function positionTabBg (_this) {
  var _this = (_this) ? $(_this).parents(".nav-item").find('a').parent() : $(' ul.nav li.nav-item a.active').parent()
  var pos = _this.position()
  var left = pos.left
  var top = pos.top
  var width = _this.width()
  var height = _this.height()
  var bg = _this.parents('ul.nav').find('.bg')
  bg.width(width).height(height).css({top:top, left: left})
}

// function positionTabBg (_this) {
//   var _this = (_this) ? $(_this).parents(".nav-item").find('a').parent() : $('#product .data .basic .info ul.nav li.nav-item a.active').parent()
//   var pos = _this.position()
//   var left = pos.left
//   var top = pos.top
//   var width = _this.width()
//   var height = _this.height()
//   var bg = _this.parents('ul.nav').find('.bg')
//   bg.width(width).height(height).css({top:top, left: left})
// }

// positionTabBg()

// $('#product .data .basic .info ul.nav li.nav-item').click(function(e){
//   positionTabBg(e.target)
// })



const test = 111
// const MiniBarSelectionModel = new MiniBar('.selection-model')
// import Vuebar from 'vuebar';
// Vue.use(Vuebar);
//console.log(Vuebar)

vm = new Vue({
  el: '#compareModal',
  data: {
    isWindowChecked: true,
    info: null,
    materials: null,
    products: [],
    iMaterialID: 1,
    selectedProducts: [7, 13, 14, 15, 16],
    comparePage: false,
    modelSelectPage: false,
    isActive: {},
    markHideSameValue: false
  },



  created() {
    console.log('beforeCreated');
    const flags = {};
    flags['mountingDepth'] = true;
    flags['profile'] = true;
    flags['profileClass'] = true;
    flags['doubleGlazing'] = true;
    flags['heatTransferResistance'] = true;
    flags['country'] = true;
    flags['test'] = true;
    flags['shapikShapeOptions'] = true;
    flags['decorationOptions'] = true;
    flags['frameFeature'] = true;
    Vue.set(this, 'isActive', flags);
  },
  watch: {
    markHideSameValue: function() {
      this.hideSameValues();
    }
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
    },
    itemsNumber: function() {
      return this.selectedProducts.length;
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
      $('#compareModal').on('show.bs.modal', function (e) {
        $('body').addClass('modal-open-compare')
        // MiniBarSelectionModel.update();
        // console.log(this.MiniBarSelectionModel)
      }) 
      $('#compareModal').on('hidden.bs.modal', function (e) {
        $('body').removeClass('modal-open-compare')
        // MiniBarSelectionModel.update();
        // console.log(this.MiniBarSelectionModel)
      }) 
    })

  },

  updated() {
    this.makeRows();
  },

  methods: {

    owlCarouselInit: function() {
      Vue.nextTick(function() {
        $(".owl-carousel").owlCarousel({
          nav: true,
          navText: [
              '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
              '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>'
          ],
          dots: false,
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

    makeRows: function() {
      Vue.nextTick(function(){
        console.log($('.myimg').height())
        const h = {}
        $('.carousel-wrapper .row-i').each((index, row) => {
          const i = $(row).index()
          const height = $(row).height()
          if (i in h) {
              
          } else {
            h[i] = []
          }
          h[i].push(height)
        })
        for(item in h) {
          h[item].sort().reverse()
        }
        console.log(h)
        $('.carousel-wrapper .row-i').each((index, row) => {
          const i = $(row).index()
          $(row).height(h[i][0])
        })
      })
    },

    selectType: function() {
      this.isWindowChecked = !this.isWindowChecked;
      console.log('isWindowChecked', this.isWindowChecked);
    },

    selectModel:  function() {
      this.modelSelectPage = true;
      console.log('selectModel', this.modelSelectPage);
    },
    makeCompare: function() {
      this.comparePage = true;
      console.log('makeCompare ', this.comparePage);
      console.log('selectedListProducts', this.selectedListProducts);
      console.log('selectedListProducts[0]', this.selectedListProducts[0].sProductTitle);
      this.owlCarouselInit()

      Vue.nextTick(function(){
        $('ul.nav li.nav-item').click(function(e){
            positionTabBg(e.target)
        })

      })
    },
    returnToSelection: function() {
      this.comparePage = false;
    },
    reloadMiniBar() {
      console.log(test)
      // Vue.nextTick(function(){
      //   new MiniBar('.selection-model').update();
      // })
    },
    getImgLink: function(fileName) {
      return '/images/product/color/' +  fileName
    },
    deleteProduct: function(index) {
      this.selectedProducts.splice(index, 1);
      if(this.selectedProducts.length === 1) {
        this.comparePage = false;
      }
      this.owlCarouselInit();
    },
    hideSameValues: function() {
      console.log('hideSameValues');
      const length = this.selectedListProducts.length;
      const flagsArr = {};
      const flags = {};
      const mountingDepthArr = [];
      const profileArr = [];
      const profileClassArr = [];
      const doubleGlazingArr = [];
      const heatTransferResistanceArr = [];
      const countryArr = [];
      const testArr = [];
      const shapikShapeOptionsArr = [];
      const decorationOptionsArr = [];
      const frameFeatureArr = [];
      if(this.markHideSameValue) {
        this.selectedListProducts.forEach( selectedProduct => {
          mountingDepthArr.push(selectedProduct.MountingDepth)
          profileArr.push(selectedProduct.Profile)
          profileClassArr.push(selectedProduct.ProfileClass)
          doubleGlazingArr.push(selectedProduct.DoubleGlazing)
          heatTransferResistanceArr.push(selectedProduct.HeatTransferResistance)
          countryArr.push(selectedProduct.brand.country.sCountryTitle)
          testArr.push('AAA')
          shapikShapeOptionsArr.push(selectedProduct.ShapikShapeOptions)
          decorationOptionsArr.push(selectedProduct.DecorationOptions)
          frameFeatureArr.push(selectedProduct.FrameFeature)
        });
        flagsArr['mountingDepth'] = mountingDepthArr;
        flagsArr['profile'] = profileArr;
        flagsArr['profileClass'] = profileClassArr;
        flagsArr['doubleGlazing'] = doubleGlazingArr;
        flagsArr['heatTransferResistance'] = heatTransferResistanceArr;
        flagsArr['country'] = countryArr;
        flagsArr['test'] = testArr;
        flagsArr['shapikShapeOptions'] = shapikShapeOptionsArr;
        flagsArr['decorationOptions'] = decorationOptionsArr;
        flagsArr['frameFeature'] = frameFeatureArr;
        flags['mountingDepth'] = !flagsArr.mountingDepth.every(function(item, i, list) { return item === list[0]; });
        flags['profile'] = !flagsArr.profile.every(function(item, i, list) { return item === list[0]; });
        flags['profileClass'] = !flagsArr.profileClass.every(function(item, i, list) { return item === list[0]; });
        flags['doubleGlazing'] = !flagsArr.doubleGlazing.every(function(item, i, list) { return item === list[0]; });
        flags['heatTransferResistance'] = !flagsArr.heatTransferResistance.every(function(item, i, list) { return item === list[0]; });
        flags['country'] = !flagsArr.country.every(function(item, i, list) { return item === list[0]; });
        flags['test'] = !flagsArr.test.every(function(item, i, list) { return item === list[0]; });
        flags['shapikShapeOptions'] = !flagsArr.shapikShapeOptions.every(function(item, i, list) { return item === list[0]; });
        flags['decorationOptions'] = !flagsArr.decorationOptions.every(function(item, i, list) { return item === list[0]; });
        flags['frameFeature'] = !flagsArr.frameFeature.every(function(item, i, list) { return item === list[0]; });
        Vue.set(this, 'isActive', flags);
      }
      else {
        flags['mountingDepth'] = true;
        flags['profile'] = true;
        flags['profileClass'] = true;
        flags['doubleGlazing'] = true;
        flags['heatTransferResistance'] = true;
        flags['country'] = true;
        flags['test'] = true;
        flags['shapikShapeOptions'] = true;
        flags['decorationOptions'] = true;
        flags['frameFeature'] = true;
        Vue.set(this, 'isActive', flags);
      }
    }
  }
})

$(document).on('click', '#compareModal .modal-dialog .modal-content .modal-body .page-compare .stages__item', function () {
  $(this).addClass('active').siblings().removeClass('active')
    .closest('div.tabs-content').find('div.days-content').removeClass('active').eq($(this).index()).addClass('active');

  var attr = $(this).attr('data-target');
  
  if (attr == 1) {
    $('.bg').css('transform', 'translate(145%,-50%)');
  }							
  if (attr == 2) {
    $('.bg').css('transform', 'translate(341.25%,-50%)');
  }							
  if (attr == 3) {
    $('.bg').css('transform', 'translate(537%,-50%)');
  }							
  if (attr == 4) {
    $('.bg').css('transform', 'translate(733.75%,-50%)');
  }							
  if (attr == 5) {
    $('.bg').css('transform', 'translate(930%,-50%)');
  }						
});




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



// new MiniBar('#table-compare', {
//   barType: "default",
//   minBarSize: 10,
//   hideBars: false,  /* v0.4.0 and above */
//   alwaysShowBars: false,
//   horizontalMouseScroll: false,

//   scrollX: true,
//   scrollY: true,

//   navButtons: false,
//   scrollAmount: 10,

//   mutationObserver: {
//       attributes: false,
//       childList: true,
//       subtree: true
//   },

//    /* v0.4.0 and above */
//   onInit: function() {
//   /* do something on init */
//   },

//    /* v0.4.0 and above */
//   onUpdate: function() {
//   /* do something on update */
//   },

//    /* v0.4.0 and above */
//   onScroll: function() {
//   /* do something on init */
//   },

//   classes: {
//       container: "mb-container",
//       content: "mb-content",
//       track: "mb-track",
//       bar: "mb-bar",
//       visible: "mb-visible",
//       progress: "mb-progress",
//       hover: "mb-hover",
//       scrolling: "mb-scrolling",
//       textarea: "mb-textarea",
//       wrapper: "mb-wrapper",
//       nav: "mb-nav",
//       btn: "mb-button",
//       btns: "mb-buttons",
//       increase: "mb-increase",
//       decrease: "mb-decrease",
//       item: "mb-item", /* v0.4.0 and above */
//       itemVisible: "mb-item-visible", /* v0.4.0 and above */
//       itemPartial: "mb-item-partial", /* v0.4.0 and above */
//       itemHidden: "mb-item-hidden" /* v0.4.0 and above */
//   }
// });