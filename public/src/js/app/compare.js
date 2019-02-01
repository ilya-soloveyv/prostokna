if ($('#compare').length) {
  vm = new Vue({
    el: '#compare',
    data: {
      maxItems: 6,
      list: [
        {
          title: "Rehau Blitz"
        },
        {
          title: "Default Windows"
        },
      ]
    },
    computed: {
      titleFromApi: function() {
        let products;
        $.ajax({
          url: "/all_windows",
          type: "GET",
          async: false,
        }).done((json) => {
          products = json;
        })
        
        products.forEach(function(item) {
          item["title"] = `${item.sBrandTitle} ${item.sProductTitle}` 
        }) 

        return products
      }
    },
    methods: {
      deleteWindow: function(index, e) {
        this.list.splice(index, 1);
      },
      openMenu: function() {
        $(".add-window-menu").addClass("active")
        console.log("open menu")
      },
      closeMenu: function() {
        $(".add-window-menu").removeClass("active")
        console.log("close menu")
      },
      addWindow: function(i) {
        this.closeMenu();
        this.list.push(this.titleFromApi[i])
        console.log(i, "Add Block");
      }
    },
    mounted() {
      console.log(this.titleFromApi[1])
    },
  })
}
