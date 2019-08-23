if ($('#productMenu').length) {
    var productsMenu = new Vue({
        el: '#productMenu',
        data: {
            iProductID: 0,
            filterParams: {
                iProductTypeID: false,
                sProductTypeTitle: 'test',
                iMaterialID: false,
                sMaterialTitle: false,
                iMaterialCategoryID: false,
                product: [],
                material: [],
                material_category: []
            },
            openFilter: false,
            filterResult: [],
            materials: [],
            producttypes: [],
            brands: [],
            products: [],
            mobile: {
                iMaterialID: false
            }
        },
        created: function () {
            this.get()
        },
        mounted: function () {
            Vue.set(this, 'iProductID', Number(this.$el.getAttribute('data-iProductID')))
        },
        watch: {
            'filterParams.iProductTypeID': function (val) {
                this.getFilterResult()
            },
            'mobile.iMaterialID': function (iMaterialID) {
                var material = this.materials.find(x => x.iMaterialID === this.mobile.iMaterialID)
                if (material.material_categories[0]) {
                    material.material_categories[0].active = true
                }
                Vue.set(this.mobile, 'material', material)
            },
            'filterParams.iMaterialID': function (iMaterialID) {
                if (iMaterialID) {
                    var material = this.filterParams.material.find(x => x.iMaterialID === iMaterialID)
                    console.log(material)
                    if (material) {
                        var sMaterialTitle = material.sMaterialTitle
                    } else {
                        var sMaterialTitle = null
                    }
                    Vue.set(this.filterParams, 'sMaterialTitle', sMaterialTitle)
                }
            }
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
            clickFilterBrand: function (brandItem) {
                this.filterResult.forEach((brand, key1) => {
                    var status = false
                    if (brandItem.iBrandID == brand.iBrandID && (brandItem.active == false || !brandItem.active)) {
                        status = true
                    }
                    Vue.set(brand, 'active', status)
                })
            },
            get: function () {
                axios.get('/getProductMenu').then((response) => {
                    this.products = response.data.products
                    this.materials = response.data.materials
                    this.producttypes = response.data.producttypes
                    if (this.producttypes[0].iProductTypeID) {
                        Vue.set(this.filterParams, 'iProductTypeID', this.producttypes[0].iProductTypeID)
                    }
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
                    // mobile
                    if (this.materials[0]) {
                        Vue.set(this.mobile, 'iMaterialID', this.materials[0].iMaterialID)
                    }

                    Vue.nextTick(function () {
                        $('[data-toggle="tooltip"]').tooltip()
                    })


                })
            },
            onlyUnique: function (value, index, self) {
                return self.indexOf(value) === index;
            },
            getFilterResult: function () {
                Vue.set(this.filterParams, 'product', [])
                Vue.set(this.filterParams, 'material', [])
                Vue.set(this.filterParams, 'iMaterialID', false)
                Vue.set(this.filterParams, 'iMaterialCategoryID', false)

                this.products.forEach(product => {
                    var check = product.product_producttypes.find(x => x.iProductTypeID === this.filterParams.iProductTypeID)
                    if (check) {
                        this.filterParams.product.push(product)
                    }
                })

                var iMaterialID = []
                var iMaterialCategoryID = []

                this.filterParams.product.forEach(product => {
                    if (product.iMaterialID) {
                        iMaterialID.push(product.iMaterialID)
                    }
                    if (product.iMaterialCategoryID) {
                        iMaterialCategoryID.push(product.iMaterialCategoryID)
                    }
                })

                var iMaterialIDUnique = iMaterialID.filter(this.onlyUnique)
                var iMaterialCategoryIDUnique = iMaterialCategoryID.filter(this.onlyUnique)

                this.materials.forEach(material => {
                    var check = iMaterialIDUnique.find(x => x === material.iMaterialID)
                    if (check) {
                        this.filterParams.material.push({
                            iMaterialID: material.iMaterialID,
                            sMaterialTitle: material.sMaterialTitle,
                            material_categories: []
                        })
                    }
                    if (material.material_categories) {
                        material.material_categories.forEach(category => {
                            var check2 = iMaterialCategoryIDUnique.find(x => x === category.iMaterialCategoryID)
                            if (check2) {
                                var material = this.filterParams.material.find(x => x.iMaterialID === category.iMaterialID)
                                material.material_categories.push({
                                    iMaterialCategoryID: category.iMaterialCategoryID,
                                    sMaterialCategoryTitle: category.sMaterialCategoryTitle
                                })
                            }
                        })
                    }
                })

                if (this.filterParams.material[0]) {
                    Vue.set(this.filterParams, 'iMaterialID', this.filterParams.material[0].iMaterialID)
                    if (this.filterParams.material[0].material_categories[0]) {
                        Vue.set(this.filterParams, 'iMaterialCategoryID', this.filterParams.material[0].material_categories[0].iMaterialCategoryID)
                    }
                }

                let sProductTypeTitle = this.producttypes.find(x => x.iProductTypeID === this.filterParams.iProductTypeID).sProductTypeTitle
                Vue.set(this.filterParams, 'sProductTypeTitle', sProductTypeTitle)

                this.getResult()

            },
            filterMaterialClick: function () {
                var iMaterialID = this.filterParams.iMaterialID
                var material = this.filterParams.material.find(x => x.iMaterialID === iMaterialID)
                if (material.material_categories[0]) {
                    Vue.set(this.filterParams, 'iMaterialCategoryID', material.material_categories[0].iMaterialCategoryID)
                } else {
                    Vue.set(this.filterParams, 'iMaterialCategoryID', false)
                }
                this.getResult()
            },
            filterMaterialCategoryClick: function () {
                this.getResult()
            },
            getResult: function () {
                Vue.set(this, 'filterResult', [])
                var iMaterialID = this.filterParams.iMaterialID
                var iMaterialCategoryID = this.filterParams.iMaterialCategoryID
                if (iMaterialID && iMaterialCategoryID) {
                    this.filterParams.product.forEach(product => {
                        if (product.iMaterialID == iMaterialID && product.iMaterialCategoryID == iMaterialCategoryID) {
                            this.addProductInResult(product)
                        }
                    })
                } else if (iMaterialID) {
                    this.filterParams.product.forEach(product => {
                        if (product.iMaterialID == iMaterialID) {
                            this.addProductInResult(product)
                        }
                    })
                }
            },
            addProductInResult: function (product) {
                var brand = this.filterResult.find(x => x.iBrandID === product.iBrandID)
                var product_temp = {
                    iProductID: product.iProductID,
                    sProductTitle: product.sProductTitle,
                    sProductURI: product.sProductURI,
                    sBrusTitle: (product.bru) ? product.bru.sBrusTitle : false
                }
                if (brand) {
                    brand.models.push(product_temp)
                } else {
                    this.filterResult.push({
                        iBrandID: product.iBrandID,
                        sBrandTitle: product.brand.sBrandTitle,
                        sBrandURI: product.brand.sBrandURI,
                        models: [product_temp],
                        active: false
                    })
                }
            },
            useFilterMobile: function () {
                Vue.set(this, 'openFilter', true)
            }
        }
    })
}
