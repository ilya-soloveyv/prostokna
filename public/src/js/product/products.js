$(document).on("click", ".productsMenu__brands__brand a", function () {
    $('.productsMenu__brands__brand').removeClass('active')
    $(this).parent().addClass('active')
    var index = $(this).parent().index()
    $('.productsMenu__products__list').removeClass('active')
    $('.productsMenu__products__list').eq(index).addClass('active')
    return false
})


$(document).on("click", ".brand_list_link", function () {
    $(this).parents('.list').find('.brand_list_item').removeClass('open')
    $(this).parents('.brand_list_item').addClass('open')
    return false
}).on("click", "#productMenu .list .item .title ul li", function () {
    $(this).addClass('active').siblings().removeClass('active')
    return false
}).on("click", "#productMenu .filter .category ul li a", function () {
    $(this).parent().addClass('active').siblings().removeClass('active')
    return false
})


if ($('#productMenu').length) {
    var productsMenu = new Vue({
        el: '#productMenu',
        data: {
            iProductID: {
                type: Number,
                default: null
            },
            materialMenus: [
                {
                    title: 'Пластик',
                    iMaterialID: 1,
                    list: []
                },
                {
                    title: 'Алюминий',
                    iMaterialID: 3,
                    list: []
                },
                {
                    title: 'Дерево',
                    iMaterialID: 4,
                    subMenu: [
                        {
                            title: 'сосна',
                            iMaterialID: 4,
                        },
                        {
                            title: 'лиственница',
                            iMaterialID: 5,
                        },
                        {
                            title: 'дуб',
                            iMaterialID: 6,
                        },
                    ],
                    list: []
                },
            ],
            materials: [],
            brands: [],
            products: [],
        },
        created: function () {
            this.get()
        },
        mounted: function() {
            Vue.set(this, 'iProductID', Number(this.$el.getAttribute('data-iProductID')))
            // console.log(this.iProductID)
        },
        methods: {
            get: function () {
                axios.get('/getProductMenu').then((response) => {
                    this.materials = response.data.materials
                    this.brands = response.data.brands
                    this.products = response.data.products
                    if (this.iProductID) {
                        var iMaterialID = this.products.find(x => x.iProductID === this.iProductID).iMaterialID
                        if (iMaterialID == 4 || iMaterialID == 5 || iMaterialID == 6) { // Колхоз. Если товар дерево, выделяем подкатегорию дерева
                            Vue.set(this.materialMenus[2], 'iMaterialID', iMaterialID)
                        }
                    }
                    this.setListInMaterial()
                    if (this.iProductID) {
                        this.materialMenus.forEach((e1, k1) => {
                            e1.list.forEach((e2, k2) => {
                                e2.list.forEach((e3, k3) => {
                                    if (e3.iProductID == this.iProductID) {
                                        Vue.set(this.materialMenus[k1].list[k2], 'active', true)
                                        Vue.set(this.materialMenus[k1].list[k2].list[k3], 'active', true)
                                    }                            
                                })
                            })
                        })    
                    }
                })
            },
            changeMaterial: function (materialMenuKey, iMaterialID) {
                Vue.set(this.materialMenus[materialMenuKey], 'iMaterialID', iMaterialID)
                this.setListInMaterial(2, 0)
            },
            setListInMaterial: function (k1 = false, k2 = false) {
                this.materialMenus.forEach((materialMenu, materialMenuKey)  => {
                    Vue.set(this.materialMenus[materialMenuKey], 'list', [])

                    this.products.forEach(product => {
                        if (product.iMaterialID == materialMenu.iMaterialID) {
                            var temp = this.materialMenus[materialMenuKey].list.find(x => x.iBrandID === product.iBrandID)
                            var product_item = {
                                iProductID: product.iProductID,
                                sProductTitle: product.sProductTitle,
                                sProductURI: product.sProductURI,
                                iGenerateUriMaterial: product.iGenerateUriMaterial,
                                iGenerateUriBrus: product.iGenerateUriBrus,
                                iMaterialID: product.iMaterialID,
                                sMaterialTitle: (product.material) ? product.material.sMaterialTitle : false,
                                sBrusTitle: (product.bru) ? product.bru.sBrusTitle : false,
                                active: false
                            }
                            if (!temp) {
                                this.materialMenus[materialMenuKey].list.push({
                                    iBrandID: product.iBrandID,
                                    sBrandTitle: product.brand.sBrandTitle,
                                    active: false,
                                    list: [product_item]
                                })
                            } else {
                                temp.list.push(product_item)
                            }
                        }
                    })
                })
                if (k1 !== false && k2 !== false) {
                    Vue.set(this.materialMenus[k1].list[k2], 'active', true)
                }
            },
            clickBrand: function (materialMenuKey, brandKey) {
                this.materialMenus.forEach((e1, k1) => {
                    e1.list.forEach((e2, k2) => {
                        var status = false
                        if (materialMenuKey == k1 && brandKey == k2 && e2.active == false) {
                            status = true
                        }
                        Vue.set(this.materialMenus[k1].list[k2], 'active', status)
                    })
                })
            }
        }
    })
}
