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
            iProductID: 0,
            materials: [],
            brands: [],
            products: [],
        },
        created: function () {
            this.get()
        },
        mounted: function() {
            Vue.set(this, 'iProductID', Number(this.$el.getAttribute('data-iProductID')))
        },
        methods: {
            clickBrand: function (brandItem) {
                this.materials.forEach((material, key1) => {
                    material.brand.forEach((brand, key2) => {
                        var status = false
                        if (brandItem.iBrandID == brand.iBrandID && (brandItem.active == false || !brandItem.active)) {
                            status = true
                        }
                        Vue.set(this.materials[key1].brand[key2], 'active', status)
                    })
                })
            },
            get: function () {
                axios.get('/getProductMenu').then((response) => {
                    this.products = response.data.products
                    this.materials = response.data.materials
                    this.materials.forEach(material => {
                        if (material.material_categories[0]) {
                            Vue.set(material, 'iMaterialCategoryID_active', material.material_categories[0].iMaterialCategoryID)
                        } else {
                            Vue.set(material, 'iMaterialCategoryID_active', false)
                        }
                        Vue.set(material, 'brand', [])
                    })
                    this.products.forEach(product => {
                        var material = this.materials.find(x => x.iMaterialID === product.iMaterialID)
                        var materialKey = this.materials.findIndex(x => x.iMaterialID === product.iMaterialID)
                        var brand = material.brand.find(x => x.iBrandID === product.brand.iBrandID)
                        var brandKey = material.brand.findIndex(x => x.iBrandID === product.brand.iBrandID)
                        var product_item = {
                            iProductID: product.iProductID,
                            sProductTitle: product.sProductTitle,
                            sProductURI: product.sProductURI,
                            iGenerateUriMaterial: product.iGenerateUriMaterial,
                            iGenerateUriBrus: product.iGenerateUriBrus,
                            iMaterialID: product.iMaterialID,
                            iMaterialCategoryID: product.iMaterialCategoryID,
                            sMaterialTitle: (product.material) ? product.material.sMaterialTitle : false,
                            sBrusTitle: (product.bru) ? product.bru.sBrusTitle : false,
                        }
                        if (brand) {
                            this.materials[materialKey].brand[brandKey].models.push(product_item)
                        } else {
                            product.brand.models = []
                            product.brand.models.push(product_item)
                            this.materials[materialKey].brand.push(product.brand)
                        }
                    })
                    if (this.iProductID) {
                        console.log(this.iProductID)
                        this.materials.forEach(material => {
                            material.brand.forEach(brand => {
                                brand.models.forEach(model => {
                                    if (model.iProductID == this.iProductID) {
                                        Vue.set(brand, 'active', true)
                                        Vue.set(model, 'active', true)
                                        if (model.iMaterialCategoryID) {
                                            Vue.set(material, 'iMaterialCategoryID_active', model.iMaterialCategoryID)
                                        }
                                    }
                                })
                            })
                        })
                    }
                })
            },
        }
    })
}
