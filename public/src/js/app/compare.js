if ($('#compare').length) {
  
  vm = new Vue({
    el: '#compare',
    data: {
      maxItems: 6,
      list: [],
      menuList: [],
      IdenticalValues: {},
      showOrHide: "Скрыть одинаковые значения",
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
          item["title"] = `${item.brand.sBrandTitle} ${item.sProductTitle}` 
          item["DoubleGlazing"] = `до ${item["DoubleGlazing"]} мм` 
          item["HeatTransferResistance"] = `до ${item["HeatTransferResistance"]} м2°С/Вт` 
          item["ProfileClass"] = `«${item["ProfileClass"]}»` 
        }) 

        console.log('titleFromApi', products);
        return products
      },
      opacityClasses: function() {
        var obj = {};
        for (key in this.titleFromApi[0]) {
          obj[key] = false;  
        }
        return obj
      }
    },
    methods: {
      deleteWindow: function(index) {
        this.list.splice(index, 1);
				this.toggleCompare("left");
        this.updateMenuList();
        this.updateIdenticalValues();
				this.changeButtonCompare();
      },
			changeButtonCompare: function() {
				console.log("Вызов");
				console.log(this.list.length < 2, "disable");
				if (this.list.length < 2) {
					$(".section.s5 .mbutton.blue.mbutton-block").addClass("disable-compare-button");
				}	else {
					$(".section.s5 .mbutton.blue.mbutton-block").removeClass("disable-compare-button");
				}
			},
			toggleCompare: function(option) {
				if (option == "left" 
				&& this.list.length == 1 
				&& $("#fullpage_welcome .section.s5 .empty").css("display") == "none") {
					console.log("==1");
					console.log(this.list.length);
					$('#fullpage_welcome .section.s5 .empty, #fullpage_welcome .section.s5 .sravnenie').toggle();
				} else if (option == "right"
				&& this.list.length > 1) {
					console.log("right");
					$('#fullpage_welcome .section.s5 .empty, #fullpage_welcome .section.s5 .sravnenie').toggle();
				}	
			},
      openMenu: function() {
        $(".pop_choice").addClass("active")
      },
      closeMenu: function() {
        $(".pop_choice").removeClass("active")
      },
      addWindow: function(i) {
        this.closeMenu();
        this.list.push(this.menuList[i])
				this.changeButtonCompare();
        this.updateMenuList();
        this.updateIdenticalValues();
      },
      updateMenuList: function() {
        var titleMap = this.list.slice().map(item => item['title'])

        this.menuList = this.titleFromApi.slice().filter((item) => {
          if (titleMap.indexOf(item.title) == -1) {return item;}
        });
      },
      detectValues: function(soh) {
        if (soh == "Скрыть одинаковые значения") {
          this.showOrHide = "Показать все";
          this.opacityActive();
        } else {
          this.showOrHide = "Скрыть одинаковые значения";
          this.opacityHide(); 
        }
      },
      opacityActive: function() {
        this.updateIdenticalValues();
        for (key in this.opacityClasses) {
          if (this.IdenticalValues.indexOf(key) != -1) {
            this.opacityClasses[key] = true;
          }
        }
      },
      opacityHide: function() {
        for (key in this.opacityClasses) {
          this.opacityClasses[key] = false;
        }
      },
      updateIdenticalValues: function() {
        obj = Object.assign({}, this.titleFromApi[0]);

        var uselessKeys = ["title", "sBrandTitle", "sProductTitle"];
        ////Удаление свойств, которые не нужно сравнивать
        uselessKeys.forEach((item) => {
          delete obj[item];
        })

        this.IdenticalValues = [];
        for (key in obj) {
          var col = this.list.slice().map(item => item[key])
            .reduce((word, nextword) => {
              return (word == nextword) ? word : undefined
              });
          if (col != undefined) {this.IdenticalValues.push(key)}
        }
        //console.log(this.IdenticalValues)
        
      },
    },
    mounted() {
      this.updateMenuList();
    },
  })
}
