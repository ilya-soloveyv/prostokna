const express = require('express')

var auth = require('http-auth');
var basic = auth.basic({
    realm: "Admin",
    file: __dirname + "/.htpasswd"
});

const app = express()
const http = require('http').createServer(app)
const config = require('config')
const pug = require('pug')
require('dotenv').config()
const mysql = require('mysql')
const async = require('async')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
const db = config.get('db')
app.use(cookieParser())
app.locals.env = process.env;
app.use(express.static('public'))
app.use(express.static('wp')) // Удалить, и папку и строку когда старый сайт будет неактуален
app.set('view engine', 'pug')
const multer = require('multer')
const sharp = require('sharp')
const cyrillicToTranslit = require('cyrillic-to-translit-js')

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'))
app.use('/vue', express.static(__dirname + '/node_modules/vue/dist'))
app.use('/vue-router', express.static(__dirname + '/node_modules/vue-router/dist'))
app.use('/axios', express.static(__dirname + '/node_modules/axios/dist'))
app.use('/vue-picture-input', express.static(__dirname + '/node_modules/vue-picture-input/umd'))
app.use('/material-icons', express.static(__dirname + '/node_modules/material-icons/css'))
app.use('/bootstrap-select', express.static(__dirname + '/node_modules/bootstrap-select/dist'))
app.use('/popperjs', express.static(__dirname + '/node_modules/popper.js/dist'))
app.use('/slick', express.static(__dirname + '/node_modules/slick-carousel/slick'))
app.use('/jquery-mousewheel', express.static(__dirname + '/node_modules/jquery-mousewheel'))
app.use('/minibarjs', express.static(__dirname + '/node_modules/minibarjs/dist'))
app.use('/vue-picture-input', express.static(__dirname + '/node_modules/vue-picture-input/umd'))




const Country = require('./models').country
const Brand = require('./models').brand
const Glazing = require('./models').glazing
const Material = require('./models').material
const Material_category = require('./models').material_category
const Color = require('./models').color
const Product = require('./models').product
const Producttype = require('./models').producttype
const Product_producttype = require('./models').product_producttype
const Product_color = require('./models').product_color
const Product_image = require('./models').product_image
const Product_image_point = require('./models').product_image_point
const Brus = require('./models').brus
const Product_link = require('./models').product_link
const Gallery_group = require('./models').gallery_group
const Gallery = require('./models').gallery
const Gallery_image = require('./models').gallery_image
const GalleryIndex = require('./models').gallery_index





if (process.env.NODE_ENV != 'development') {
    app.use(function (req, res, next) {
        if (req.secure) {
            next()
        } else {
            res.redirect(301, 'https://' + req.headers.host + req.url)
        }
    })
}

app.all('*', (req, res, next) => {
    if (req.headers.host.match(/^www/) !== null) {
        res.redirect(301, 'https://' + req.headers.host.replace(/^www\./, '') + req.url)
    } else {
        next()
    }
})


app.get('/getProductMenu', async (req, res) => {
    let result = {}

    result.materials = await Material.findAll({
        where: {
            iActive: 1
        },
        include: [
            {
                model: Material_category
            }
        ],
        order: [
            ['iMaterialID', 'ASC']
        ]
    })
    result.material_categorys = await Material_category.findAll()
    result.producttypes = await Producttype.findAll()
    result.brands = await Brand.findAll()
    result.products = await Product.findAll({
        attributes: [
            'iProductID',
            'iMaterialID',
            'iMaterialCategoryID',
            'iBrandID', 'sProductTitle',
            'sProductURI',
            'iGenerateUriMaterial',
            'iGenerateUriBrus'
        ],
        include: [
            {
                model: Brand,
                attributes: ['iBrandID', 'sBrandTitle', 'sBrandURI']
            },
            {
                model: Material,
                attributes: ['iMaterialID', 'sMaterialTitle']
            },
            {
                model: Material_category,
                attributes: ['iMaterialCategoryID', 'iMaterialID', 'sMaterialCategoryTitle']
            },
            {
                model: Brus,
                attributes: ['iBrusID', 'sBrusTitle']
            },
            {
                model: Product_producttype,
                attributes: ['iProductProductTypeID', 'iProductID', 'iProductTypeID']
            }
        ],
        where: {
            iActive: 1
        }
    })

    res.json(result)
})





app.post('/test', async (req, res) => {

    // var product_image_point = await Product_image_point.findAll({
    //     include: [
    //         {
    //             model: Product
    //         },
    //         {
    //             model: Product_image
    //         }
    //     ]
    // })
    // res.json(product_image_point)

    // var product_image = await Product_image.findAll({
    //     include: [
    //         {
    //             model: Product
    //         },
    //         {
    //             model: Product_image_point
    //         }
    //     ]
    // })
    // res.json(product_image)

    // var product = await Product.findAll({
    //     include: [
    //         {
    //             model: Material
    //         },
    //         {
    //             model: Brand
    //         },
    //         {
    //             model: Product_color
    //         },
    //         {
    //             model: Product_image
    //         },
    //     ]
    // })
    // res.json(product)

    // var product_color = await Product_color.findAll({
    //     include: [
    //         {
    //             model: Product
    //         },
    //         {
    //             model: Color
    //         },
    //     ]
    // })
    // res.json(product_color)

    // var color = await Color.findAll({
    //     include: [
    //         {
    //             model: Material
    //         }
    //     ]
    // })
    // res.json(color)

    // var material = await Material.findAll({
    //     include: [
    //         {
    //             model: Color
    //         },
    //         {
    //             model: Product
    //         }
    //     ]
    // })
    // res.json(material)

    // var brand = await Brand.findAll({
    //     include: [
    //         {
    //             model: Country
    //         },
    //         {
    //             model: Product
    //         }
    //     ]
    // })
    // res.json(brand)

    // var country = await Country.findAll({
    //     include: [
    //         {
    //             model: Brand
    //         }
    //     ]
    // })
    // res.json(country)

})


function randomString() {
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (var i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

var data = {}

app.get('*', async (req, res, next) => {
    data.productMenu = await Brand.findAll({
        include: [
            {
                model: Product,
                where: {
                    iActive: 1
                },
                attributes: ['iProductID', 'sProductTitle', 'sProductURI', 'iMaterialID', 'iGenerateUriBrus', 'iGenerateUriMaterial'],
                required: true,
                include: [
                    {
                        model: Material,
                        attributes: ['sMaterialTitle']
                    },
                    {
                        model: Brus,
                        attributes: ['sBrusTitle']
                    },
                ]
            }
        ]
    })

    data.brandMenu = []

    data.productMenu.forEach((brand, index1) => {
        data.brandMenu.push({
            iBrandID: brand.iBrandID,
            sBrandTitle: brand.sBrandTitle,
            iCountryID: brand.iCountryID,
            products: {
                list: [],
                material: []
            }
        })

        brand.products.forEach((product, index2) => {

            var product_item = {
                iProductID: product.iProductID,
                sProductTitle: product.sProductTitle,
                sProductURI: product.sProductURI,
                iGenerateUriBrus: product.iGenerateUriBrus,
                iGenerateUriMaterial: product.iGenerateUriMaterial,
            }
            if (product.iGenerateUriBrus) {
                product_item.sBrusTitle = product.bru.sBrusTitle
            }

            if (product.iGenerateUriMaterial == 1) {

                var material_index = data.brandMenu[index1].products.material.findIndex(
                    function (material, index) {
                        return material.iMaterialID == product.iMaterialID
                    }
                )

                if (material_index < 0) {
                    data.brandMenu[index1].products.material.push(
                        {
                            iMaterialID: product.iMaterialID,
                            sMaterialTitle: product.material.sMaterialTitle,
                            list: []
                        }
                    )
                    material_index = data.brandMenu[index1].products.material.length - 1
                }

                data.brandMenu[index1].products.material[material_index].list.push(product_item)

            } else {
                data.brandMenu[index1].products.list.push(product_item)
            }

        })
    })

    // res.json(data.productMenu)
    // res.json(data)

    data.page_path = req.path
    data.NODE_ENV = process.env.NODE_ENV
    // console.log(req.path)

    next()
})

data.left_menu = [
    {
        title: 'Главная',
        uri: '/',
        ico: 'home',
    },
    {
        title: 'Окна',
        uri: '/product',
        ico: 'window',
    },
    {
        title: 'Как измерить окно',
        uri: '#',
        ico: 'angle',
    },
    // {
    //     title: 'Услуги',
    //     uri: '/',
    //     ico: [ '3.svg', '3a.svg' ]
    // },
    {
        title: 'Галерея работ',
        uri: '/gallery',
        ico: 'gallery',
    },
    {
        title: 'О компании',
        uri: '/company',
        ico: 'handshake',
    },
    {
        title: 'Как мы работаем',
        uri: '/work',
        ico: 'gear',
    },
    {
        title: 'Словарь оконных терминов',
        uri: '/wiki',
        ico: 'book',
    },
    {
        title: 'Сравнение профильных систем',
        uri: '#',
        ico: 'scales',
        attr: { 'data-toggle': 'modal' , 'data-target': '#compareModal'}
    },
    {
        title: 'Контакты',
        uri: '/contact',
        ico: 'marker',
    },
]

data.times = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
]

app.get('/admin', auth.connect(basic), (req, res) => {
    res.render('admin.pug')
})
app.post('/admin/ProductList', async (req, res) => {
    var responce = {}
    responce.product = await Product.findAll({
        order: [
            ['iProductID', 'ASC']
        ],
        include: [Brand, Material, Brus],
    })
    res.json(responce)
})
app.post('/admin/ProductEdit', async (req, res) => {
    var responce = {}
    responce.brand = await Brand.findAll()
    responce.brus = await Brus.findAll()
    responce.material = await Material.findAll()
    responce.material_category = await Material_category.findAll()
    responce.producttype = await Producttype.findAll()
    responce.color = await Color.findAll({
        order: [
            ['iOrder', 'ASC'],
            ['iColorID', 'ASC']
        ]
    })
    if (req.body.iProductID) {
        responce.product = await Product.getProduct(Number(req.body.iProductID))
    }
    responce.products = await Product.findAll({
        include: [Brand, Material, Brus]
    })
    res.json(responce)
})
app.post('/admin/ProductUpdate', async (req, res) => {
    var iProductID = (req.body.product.iProductID) ? req.body.product.iProductID : false

    req.body.product.iProductParam1 = (req.body.product.iProductParam1) ? req.body.product.iProductParam1 : null
    req.body.product.iProductParam2 = (req.body.product.iProductParam2) ? req.body.product.iProductParam2 : null
    req.body.product.iProductParam3 = (req.body.product.iProductParam3) ? req.body.product.iProductParam3 : null
    req.body.product.iProductParam4 = (req.body.product.iProductParam4) ? req.body.product.iProductParam4 : null
    req.body.product.iProductParam5 = (req.body.product.iProductParam5) ? req.body.product.iProductParam5 : null
    req.body.product.iProductParam6 = (req.body.product.iProductParam6) ? req.body.product.iProductParam6 : null

    req.body.product.iGenerateUriMaterial = (req.body.product.iGenerateUriMaterial) ? 1 : 0
    req.body.product.iGenerateUriBrus = (req.body.product.iGenerateUriBrus) ? 1 : 0

    req.body.product.iPrice = (req.body.product.iPrice) ? req.body.product.iPrice : null
    req.body.product.iActive = (req.body.product.iActive) ? 1 : 0

    req.body.product.iMaterialCategoryID = (req.body.product.iMaterialCategoryID) ? req.body.product.iMaterialCategoryID : null

    // Подготавливаем URI
    brand = await Brand.findByPk(req.body.product.iBrandID, {
        attributes: ['sBrandTitle']
    })
    var uri_string = brand.sBrandTitle + ' ' + req.body.product.sProductTitle

    if (req.body.product.iGenerateUriMaterial && req.body.product.iMaterialCategoryID) {
        material_category = await Material_category.findByPk(req.body.product.iMaterialCategoryID, {
            attributes: ['sMaterialCategoryTitle']
        })
        uri_string += '_' + material_category.sMaterialCategoryTitle
    }

    if (req.body.product.iGenerateUriBrus && req.body.product.iBrusID) {
        brus = await Brus.findByPk(req.body.product.iBrusID, {
            attributes: ['sBrusTitle']
        })
        uri_string += '_' + brus.sBrusTitle
    }

    req.body.product.sProductURI = cyrillicToTranslit().transform(uri_string, "_").toLowerCase()
    // *** //

    if (iProductID) {
        await Product.update(req.body.product, {
            where: {
                iProductID: iProductID
            }
        })
    } else {
        await Product.create(req.body.product).then((response) => {
            iProductID = response.iProductID
        })
    }

    const productImage = async () => {
        if (req.body.product.product_images) {
            for (const image of req.body.product.product_images) {
                image.iPhotoInDescOnPage = (image.iPhotoInDescOnPage) ? 1 : 0
                if (image.iProductImageID && image.del === true) {
                    await Product_image.destroy({
                        where: {
                            iProductImageID: image.iProductImageID
                        }
                    })
                } else if (image.iProductImageID) {
                    await Product_image.update({
                        sProductImageFrontName: image.sProductImageFrontName,
                        sProductImageBackName: image.sProductImageBackName,
                        iPhotoInDescOnPage: image.iPhotoInDescOnPage,
                        iOrder: image.iOrder,
                    }, {
                            where: {
                                iProductImageID: image.iProductImageID
                            }
                        })
                } else if (image.del !== true) {
                    await Product_image.create({
                        iProductID: iProductID,
                        sProductImageFrontName: image.sProductImageFrontName,
                        sProductImageBackName: image.sProductImageBackName,
                        iPhotoInDescOnPage: image.iPhotoInDescOnPage,
                        iOrder: image.iOrder,
                    })
                }
            }
        }
    }
    await productImage()

    const productImageColor = async () => {
        if (req.body.product.product_colors) {
            for (const image of req.body.product.product_colors) {
                if (image.iProductColorID && image.del === true) {
                    await Product_color.destroy({
                        where: {
                            iProductColorID: image.iProductColorID
                        }
                    })
                } else if (image.iProductColorID) {
                    await Product_color.update({
                        iColorID: image.iColorID,
                        sProductColorFilename: image.sProductColorFilename,
                        iIndex: image.iIndex,
                    }, {
                            where: {
                                iProductColorID: image.iProductColorID
                            }
                        })
                } else if (image.del !== true) {
                    await Product_color.create({
                        iProductID: iProductID,
                        iColorID: image.iColorID,
                        sProductColorFilename: image.sProductColorFilename,
                        iIndex: image.iIndex,
                    })
                }
            }
        }
    }
    await productImageColor()

    var productLink = async () => {
        if (req.body.product.product_links) {
            for (const item of req.body.product.product_links) {
                if (item.iProductLinkID && item.del === true) {
                    await Product_link.destroy({
                        where: {
                            iProductLinkID: item.iProductLinkID
                        }
                    })
                } else if (item.iProductLinkID) {
                    await Product_link.update({
                        iProductIDFrom: item.iProductIDFrom,
                        iProductIDTo: item.iProductIDTo,
                    }, {
                            where: {
                                iProductLinkID: item.iProductLinkID
                            }
                        })
                } else if (item.del !== true) {
                    await Product_link.create({
                        iProductIDFrom: item.iProductIDFrom,
                        iProductIDTo: item.iProductIDTo,
                    })
                }
            }
        }
    }
    await productLink()

    var productType = async () => {
        if (req.body.product.product_producttype) {
            await Product_producttype.destroy({
                where: {
                    iProductID: iProductID
                }
            })
            for (const iProductTypeID of req.body.product.product_producttype) {
                await Product_producttype.create({
                    iProductID: iProductID,
                    iProductTypeID: iProductTypeID,
                })
            }
        }
    }
    await productType()


    var responce = {}
    // responce.brand = await Brand.findAll()
    // responce.material = await Material.findAll()
    responce.product = await Product.getProduct(iProductID)
    res.json(responce)
})
app.post('/admin/ProductDelete', async (req, res) => {
    var iProductID = (req.body.product.iProductID) ? req.body.product.iProductID : false

    if (iProductID) {
        await Product.destroy({
            where: {
                iProductID: iProductID,
            }
        })
    }

    res.json(true)
})
app.post('/admin/upload', (req, res) => {

    var filename = randomString() + '.' + req.headers.extension

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images/product/gallery')
        },
        filename: function (req, file, cb) {
            cb(null, filename)
        }
    })

    var upload = multer({ storage: storage }).single('file')

    upload(req, res, function (err, responce) {
        res.json(req.file)
    })

})
app.post('/admin/ProductUploadColor', (req, res) => {
    var filename = randomString() + '.' + req.headers.extension
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images/product/color')
        },
        filename: function (req, file, cb) {
            cb(null, filename)
        }
    })
    var upload = multer({ storage: storage }).single('file')
    upload(req, res, function (err, responce) {
        res.json(req.file)
    })
})

app.post('/admin/ColorList', async (req, res) => {
    var data = {}
    data.material = await Material.findAll()
    data.color = await Color.findAll({
        include: [
            {
                model: Material
            }
        ],
        order: [
            ['iMaterialID', 'ASC'],
            ['iOrder', 'ASC'],
            ['iColorID', 'ASC']
        ]
    })
    res.json(data)
})
app.post('/admin/ColorUpdate', async (req, res) => {

    var color = req.body.color

    if (color.iColorID && color.del === true) {
        await Color.destroy({
            where: {
                iColorID: color.iColorID
            }
        })
    } else if (color.iColorID) {
        await Color.update({
            iMaterialID: color.iMaterialID,
            sColorCode: color.sColorCode,
            sColorTitle: color.sColorTitle,
            sColorTitleCode: color.sColorTitleCode,
            sColorTextureFileName: color.sColorTextureFileName,
            iOrder: color.iOrder,
        }, {
                where: {
                    iColorID: color.iColorID
                }
            })
    } else if (color.del !== true) {
        await Color.create({
            iMaterialID: color.iMaterialID,
            sColorCode: color.sColorCode,
            sColorTitle: color.sColorTitle,
            sColorTitleCode: color.sColorTitleCode,
            sColorTextureFileName: color.sColorTextureFileName,
            iOrder: color.iOrder,
        })
    }

    var data = {}
    data.color = await Color.findAll({
        include: [
            {
                model: Material
            }
        ],
        order: [
            ['iMaterialID', 'ASC'],
            ['iOrder', 'ASC'],
            ['iColorID', 'ASC']
        ]
    })
    res.json(data)
})
app.post('/admin/ColorUpload', async (req, res) => {
    var filename = randomString() + '.' + req.headers.extension
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images/color')
        },
        filename: function (req, file, cb) {
            cb(null, filename)
        }
    })
    var upload = multer({ storage: storage }).single('file')
    upload(req, res, function (err, responce) {
        res.json(req.file)
    })
})

app.post('/admin/GalleryList', async (req, res) => {
    var data = {}
    data.gallery_group = await Gallery_group.findAll()
    data.gallery = await Gallery.getList()
    res.json(data)
})
app.post('/admin/GalleryUpload', async (req, res) => {
    var filesName = []
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images/gallery')
        },
        filename: function (req, file, cb) {
            var name = randomString() + '.' + file.originalname.split('.').pop()
            filesName.push(name)
            cb(null, 'temp_' + name)
        }
    })
    var upload = multer({ storage: storage }).array('file')
    upload(req, res, function (err, responce) {
        var check = 0
        filesName.forEach(name => {
            sharp('./public/images/gallery/' + 'temp_' + name)
                .resize(900, 900)
                .toFile('./public/images/gallery/' + name, function (err, response) {
                    sharp.cache(false)
                    check++
                    if (check == filesName.length) {
                        res.send(filesName)
                    }
                })
        })
    })
})
app.post('/admin/GalleryUpdate', async (req, res) => {

    var iGalleryID = req.body.gallery.iGalleryID

    if (iGalleryID) {
        await Gallery.update(req.body.gallery, {
            where: {
                iGalleryID: iGalleryID
            }
        })
    } else {
        await Gallery.create(req.body.gallery).then((response) => {
            console.log(response.dataValues.iGalleryID)
            iGalleryID = response.dataValues.iGalleryID
        })
    }



    const galleryImage = async () => {
        if (req.body.gallery.gallery_images) {
            for (const image of req.body.gallery.gallery_images) {
                if (image.iGalleryImageID && image.del === true) {
                    await Gallery_image.destroy({
                        where: {
                            iGalleryImageID: image.iGalleryImageID
                        }
                    })
                } else if (image.iGalleryImageID) {
                    await Gallery_image.update({
                        sGalleryImageName: image.sGalleryImageName,
                        iGalleryImageOrder: image.iGalleryImageOrder
                    }, {
                            where: {
                                iGalleryImageID: image.iGalleryImageID
                            }
                        })
                } else if (image.del !== true) {
                    await Gallery_image.create({
                        iGalleryID: iGalleryID,
                        sGalleryImageName: image.sGalleryImageName,
                        iGalleryImageOrder: image.iGalleryImageOrder
                    })
                }
            }
        }
    }
    await galleryImage()



    var data = {}
    data.gallery = await Gallery.getList()
    res.json(data)
})
app.post('/admin/GalleryRemove', async (req, res) => {
    await Gallery.destroy({
        where: {
            iGalleryID: req.body.iGalleryID,
        }
    })
    var data = {}
    data.gallery = await Gallery.getList()
    res.json(data)
})

app.post('/admin/BrandList', async (req, res) => {
    var request = {}

    request.brand = await Brand.findAll({
        include: [
            {
                model: Country
            }
        ]
    })
    request.country = await Country.findAll()

    res.json(request)
})
app.post('/admin/BrandUpdate', async (req, res) => {
    var request = {}

    var brand = (req.body.brand) ? req.body.brand : {}
    brand.sBrandTitle = (brand.sBrandTitle) ? brand.sBrandTitle : false
    brand.iCountryID = (brand.iCountryID) ? brand.iCountryID : false
    if (brand.sBrandTitle) {
        brand.sBrandURI = cyrillicToTranslit().transform(brand.sBrandTitle, "_").toLowerCase()
    }
    brand.iActive = (brand.iActive) ? 1 : 0
    brand.sBrandDesc = (brand.sBrandDesc) ? brand.sBrandDesc : null

    if (brand.iBrandID && brand.sBrandTitle && brand.iCountryID) {
        await Brand.update(brand, {
            where: {
                iBrandID: brand.iBrandID
            }
        })
    } else {
        var { dataValues, iBrandID } = await Brand.create(brand)
        brand.iBrandID = iBrandID
    }

    if (brand.iBrandID) {
        request.brand = await Brand.findByPk(brand.iBrandID, {
            include: [
                {
                    model: Country
                }
            ]
        })
    }

    res.json(request)
})




app.post('/admin/part/getPartList', async (req, res) => {
    const response = {}
    const Part = require('./models').part
    response.partList = await Part.findAll({
        order: [
            ['iActive', 'DESC'],
            ['iOrder', 'ASC']
        ]
    })
    res.json(response)
})
app.post('/admin/part/getPartItem', async (req, res) => {
    const response = {}
    const iPartID = req.body.iPartID
    const Part = require('./models').part
    response.part = await Part.findByPk(iPartID)
    res.json(response)
})
app.post('/admin/part/updatePart', async (req, res) => {
    const Part = require('./models').part
    const response = {}
    let iPartID = req.body.iPartID || false
    const sPartTitle = req.body.sPartTitle || null
    const sPartURI = req.body.sPartURI || cyrillicToTranslit().transform(sPartTitle, "_").toLowerCase()
    const iActive = req.body.iActive || false
    const iOrder = req.body.iOrder || 9999
    if (iPartID) {
        response.update = await Part.update({
            sPartTitle,
            sPartURI,
            iActive,
            iOrder
        }, {
            where: {
                iPartID
            }
        })
    } else {
        response.create = await Part.create({
            sPartTitle,
            sPartURI,
            iActive,
            iOrder
        })
        iPartID = response.create.iPartID
    }
    response.part = await Part.findByPk(iPartID)
    res.json(response)
})
app.post('/admin/part/destroyPart', async (req, res) => {
    const Part = require('./models').part
    const response = {}
    const iPartID = req.body.iPartID
    response.destroy = await Part.destroy({
        where: {
            iPartID
        }
    })
    res.json(response)
})
app.post('/admin/part/getBrandList', async (req, res) => {
    const response = {}
    const iPartID = req.body.iPartID
    const PartBrand = require('./models').partBrand
    response.partBrandList = await PartBrand.findAll({
        where: {
            iPartID
        },
        order: [
            ['iActive', 'DESC'],
            ['iOrder', 'ASC']
        ]
    })
    res.json(response)
})
app.post('/admin/part/getPartBrandItem', async (req, res) => {
    const response = {}
    const iPartBrandID = req.body.iPartBrandID
    const PartBrand = require('./models').partBrand
    response.partBrand = await PartBrand.findByPk(iPartBrandID)
    res.json(response)
})
app.post('/admin/part/updatePartBrand', async (req, res) => {
    const PartBrand = require('./models').partBrand
    const response = {}
    let iPartBrandID = req.body.iPartBrandID || false
    const iPartID = req.body.iPartID || null
    const sPartBrandTitle = req.body.sPartBrandTitle || null
    const sPartBrandURI = req.body.sPartBrandURI || cyrillicToTranslit().transform(sPartBrandTitle, "_").toLowerCase()
    const iActive = req.body.iActive || false
    const iOrder = req.body.iOrder || 9999
    if (iPartBrandID) {
        response.update = await PartBrand.update({
            sPartBrandTitle,
            sPartBrandURI,
            iActive,
            iOrder
        }, {
            where: {
                iPartBrandID
            }
        })
    } else {
        response.create = await PartBrand.create({
            sPartBrandTitle,
            sPartBrandURI,
            iPartID,
            iActive,
            iOrder
        })
        iPartBrandID = response.create.iPartBrandID
    }
    response.partBrand = await PartBrand.findByPk(iPartBrandID)
    res.json(response)
})
app.post('/admin/part/destroyPartBrand', async (req, res) => {
    const PartBrand = require('./models').partBrand
    const response = {}
    const iPartBrandID = req.body.iPartBrandID
    response.destroy = await PartBrand.destroy({
        where: {
            iPartBrandID
        }
    })
    res.json(response)
})
app.post('/admin/part/getPartModelList', async (req, res) => {
    const response = {}
    const iPartBrandID = req.body.iPartBrandID
    const PartModel = require('./models').partModel
    response.partModelList = await PartModel.findAll({
        where: {
            iPartBrandID
        },
        order: [
            ['iActive', 'DESC'],
            ['iOrder', 'ASC']
        ]
    })
    res.json(response)
})
app.post('/admin/part/getPartModelItem', async (req, res) => {
    const response = {}
    const iPartModelID = req.body.iPartModelID
    const PartModel = require('./models').partModel
    response.partModel = await PartModel.get(iPartModelID)
    res.json(response)
})
app.post('/admin/part/updatePartModel', async (req, res) => {
    const PartModel = require('./models').partModel
    const response = {}
    let iPartModelID = req.body.iPartModelID || false
    const iPartBrandID = req.body.iPartBrandID || null
    const sPartModelTitle = req.body.sPartModelTitle || null
    const sPartModelURI = req.body.sPartModelURI || cyrillicToTranslit().transform(sPartModelTitle, "_").toLowerCase()
    const iPartModelPrice = req.body.iPartModelPrice || 1
    const tPartModelDesc = req.body.tPartModelDesc || null
    const iActive = req.body.iActive || false
    const iOrder = req.body.iOrder || 9999
    if (iPartModelID) {
        response.update = await PartModel.update({
            sPartModelTitle,
            sPartModelURI,
            iPartModelPrice,
            tPartModelDesc,
            iActive,
            iOrder
        }, {
            where: {
                iPartModelID
            }
        })
    } else {
        response.create = await PartModel.create({
            iPartBrandID,
            sPartModelTitle,
            sPartModelURI,
            iPartModelPrice,
            tPartModelDesc,
            iActive,
            iOrder
        })
        iPartModelID = response.create.iPartModelID
    }
    response.partModel = await PartModel.get(iPartModelID)
    res.json(response)
})
app.post('/admin/part/destroyPartModel', async (req, res) => {
    const PartModel = require('./models').partModel
    const response = {}
    const iPartModelID = req.body.iPartModelID
    response.destroy = await PartModel.destroy({
        where: {
            iPartModelID
        }
    })
    res.json(response)
})
app.post('/admin/part/getPartColorList', async (req, res) => {
    const response = {}
    const iPartBrandID = req.body.iPartBrandID
    const PartColor = require('./models').partColor
    response.partColorList = await PartColor.findAll({
        where: {
            iPartBrandID
        },
        order: [
            ['iActive', 'DESC'],
            ['iOrder', 'ASC']
        ]
    })
    res.json(response)
})
app.post('/admin/part/getPartColorItem', async (req, res) => {
    const response = {}
    const iPartColorID = req.body.iPartColorID
    const PartColor = require('./models').partColor
    response.partColor = await PartColor.findByPk(iPartColorID)
    res.json(response)
})
app.post('/admin/part/updatePartColor', async (req, res) => {
    const PartColor = require('./models').partColor
    const response = {}
    let iPartColorID = req.body.iPartColorID || false
    const iPartBrandID = req.body.iPartBrandID || null
    const sPartColorTitle = req.body.sPartColorTitle || null
    const sPartColorCode = req.body.sPartColorCode || null
    const sPartColorTitleCode = req.body.sPartColorTitleCode || null
    const sPartColorFileName = req.body.sPartColorFileName || null
    const iPartColorCheck = req.body.iPartColorCheck || false
    const iActive = req.body.iActive || false
    const iOrder = req.body.iOrder || 9999
    if (iPartColorID) {
        response.update = await PartColor.update({
            sPartColorTitle,
            sPartColorCode,
            sPartColorTitleCode,
            sPartColorFileName,
            iPartColorCheck,
            iActive,
            iOrder
        }, {
            where: {
                iPartColorID
            }
        })
    } else {
        response.create = await PartColor.create({
            iPartBrandID,
            sPartColorTitle,
            sPartColorCode,
            sPartColorTitleCode,
            sPartColorFileName,
            iPartColorCheck,
            iActive,
            iOrder
        })
        iPartColorID = response.create.iPartColorID
    }
    response.partModel = await PartColor.findByPk(iPartColorID)
    res.json(response)
})
app.post('/admin/part/destroyPartColor', async (req, res) => {
    const PartColor = require('./models').partColor
    const response = {}
    const iPartColorID = req.body.iPartColorID
    response.destroy = await PartColor.destroy({
        where: {
            iPartColorID
        }
    })
    res.json(response)
})
app.post('/admin/part/uploadPartModel', async (req, res) => {
    const PartModel = require('./models').partModel
    var filename = randomString() + '.' + req.headers.extension
    const iPartModelID = req.headers.ipartmodelid
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images/part')
        },
        filename: function (req, file, cb) {
            cb(null, filename)
        }
    })
    var upload = multer({ storage: storage }).single('file')
    upload(req, res, async function (err, resp) {
        const response = {}
        await PartModel.update(
            {
                sPartModelFile: req.file.filename
            },
            {
                where: {
                    iPartModelID
                }
            }
        )
        // response.file = file
        // response.images = await PartImage.getList(iPartModelID)
        res.json(response)
    })
})
app.post('/admin/part/uploadPartColor', async (req, res) => {
    const PartImage = require('./models').partImage
    var filename = randomString() + '.' + req.headers.extension
    const iPartModelID = req.headers.ipartmodelid
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images/part')
        },
        filename: function (req, file, cb) {
            cb(null, filename)
        }
    })
    var upload = multer({ storage: storage }).single('file')
    upload(req, res, async function (err, resp) {
        const response = {}
        await PartImage.create({
            iPartModelID,
            sPartImageFile: req.file.filename,
            iActive: true
        })
        // response.file = file
        response.images = await PartImage.getList(iPartModelID)
        res.json(response)
    })  
})
app.post('/admin/part/destroyPartModelImage', async (req, res) => {
    const fs = require('fs')
    const PartImage = require('./models').partImage
    const response = {}
    const iPartImageID = req.body.iPartImageID
    response.image = await PartImage.findByPk(iPartImageID)
    fs.unlinkSync('./public/images/part/' + response.image.sPartImageFile)
    await PartImage.destroy({
        where: {
            iPartImageID
        }
    })
    response.images = await PartImage.getList(response.image.iPartModelID)
    res.json(response)
})
app.post('/admin/part/updatePartModelImage', async (req, res) => {
    const PartImage = require('./models').partImage
    const response = {}
    const iPartModelID = req.body.iPartModelID
    const iPartImageID = req.body.iPartImageID
    const iPartColorID = req.body.iPartColorID
    const iPartColorPrice = req.body.iPartColorPrice || null
    await PartImage.update(
        {
            iPartColorID,
            iPartColorPrice
        },
        {
            where: {
                iPartImageID
            }            
        }
    )
    response.images = await PartImage.getList(iPartModelID)
    res.json(response)
})


app.post('/admin/index/s1/left/get', async (req, res) => {
    const response = {}
    const IndexS1 = require('./models').index_s1
    response.left = await IndexS1.findByPk(1)
    res.json(response)
})
app.post('/admin/index/s1/left/update', async (req, res) => {
    const response = {}
    const IndexS1 = require('./models').index_s1
    const s1Title = req.body.s1Title
    const s1Desc = req.body.s1Desc
    await IndexS1.update({
        s1Title,
        s1Desc
    }, {
        where: {
            s1ID: 1
        }
    })
    response.left = await IndexS1.findByPk(1)
    res.json(response)
})
app.post('/admin/index/s1/actions/get', async (req, res) => {
    const response = {}
    const IndexS1Action = require('./models').index_s1_action
    response.actions = await IndexS1Action.findAll({
        order: [
            ['iActive', 'DESC'],
            ['iOrder', 'ASC'],
            ['s1ActionID', 'ASC']
        ]
    })
    res.json(response)
})
app.post('/admin/index/s1/actions/upload', async (req, res) => {
    var filename = randomString() + '.' + req.headers.extension
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images/actions')
        },
        filename: function (req, file, cb) {
            cb(null, filename)
        }
    })
    var upload = multer({ storage: storage }).single('file')
    upload(req, res, async function (err, resp) {
        const response = {}
        response.filename = filename
        return res.json(response)
    })
})
app.post('/admin/index/s1/actions/update', async (req, res) => {
    const response = {}
    const IndexS1Action = require('./models').index_s1_action

    const actions = req.body.actions

    for (const action of actions) {
        const s1ActionID = action.s1ActionID || false
        const s1ActionTitle = action.s1ActionTitle || null
        const s1ActionURL = action.s1ActionURL || null
        const s1ActionImage = action.s1ActionImage || null
        const s1ActionImageMobile = action.s1ActionImageMobile || null
        const iActive = action.iActive || false
        const iOrder = action.iOrder || 9999
        if (action.del === true && s1ActionID) {
            await IndexS1Action.destroy({
                where: {
                    s1ActionID
                }
            })
        } else if (!action.del && s1ActionID) {
            await IndexS1Action.update({
                s1ActionTitle,
                s1ActionURL,
                s1ActionImage,
                s1ActionImageMobile,
                iActive,
                iOrder
            }, {
                where: {
                    s1ActionID
                }
            })
        } else if (!action.del) {
            await IndexS1Action.create({
                s1ActionTitle,
                s1ActionURL,
                s1ActionImage,
                s1ActionImageMobile,
                iActive,
                iOrder
            })
        }
    }

    res.json(response)
})

app.post('/admin/index/s5/get', async (req, res) => {
    const response = {}
    response.gallery = await GalleryIndex.list()
    response.products = await Product.list()
    res.json(response)
})
app.post('/admin/index/s5/upload', async (req, res) => {
    var filename = randomString() + '.' + req.headers.extension
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images/gallery')
        },
        filename: function (req, file, cb) {
            cb(null, filename)
        }
    })
    var upload = multer({ storage: storage }).single('file')
    upload(req, res, async function (err, resp) {
        const response = {}
        response.filename = filename
        return res.json(response)
    })
})
app.post('/admin/index/s5/update', async (req, res) => {
    const response = {}

    const gallerys = req.body.gallery

    for (const gallery of gallerys) {
        const iGalleryIndexID = gallery.iGalleryIndexID || false
        const iProductID = gallery.iProductID || null
        const sGalleryIndexTitle = gallery.sGalleryIndexTitle || null
        const tGalleryIndexText = gallery.tGalleryIndexText || null
        const sGalleryIndexImage = gallery.sGalleryIndexImage || null
        const iActive = gallery.iActive || false
        const iOrder = gallery.iOrder || 9999
        if (gallery.destroy === true && iGalleryIndexID) {
            await GalleryIndex.destroy({
                where: {
                    iGalleryIndexID
                }
            })
        } else if (!gallery.destroy && iGalleryIndexID) {
            await GalleryIndex.update({
                iProductID,
                sGalleryIndexTitle,
                tGalleryIndexText,
                sGalleryIndexImage,
                iActive,
                iOrder
            }, {
                where: {
                    iGalleryIndexID
                }
            })
        } else if (!gallery.destroy) {
            await GalleryIndex.create({
                iProductID,
                sGalleryIndexTitle,
                tGalleryIndexText,
                sGalleryIndexImage,
                iActive,
                iOrder
            })
        }
    }

    res.json(response)
})

app.use('/admin/intuitive', require('./routes/admin/intuitive'))



// cookie
// app.use(function (req, res, next) {
//     var cookie = req.cookies.cookieName;
//     if (cookie === undefined) {
//         var randomNumber = Math.random().toString()
//         randomNumber = randomNumber.substring(2,randomNumber.length)
//         res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true })
//     } else {
//         console.log('cookie exists', cookie)
//     }
//     next()
// });

app.get('/', async (req, res) => {
    data.title = 'Просто окна'
    data.description = 'Просто Окна – замер, проектирование, изготовление и реализация светопрозрачных конструкций любых типов: пластиковые окна ПВХ, алюминиевые окна, деревянные окна из евробруса, витражи, фасады и стоечно-ригельные системы. Монтажные работы любой сложности. Окна от производителя по лучшим ценам в Москве, МО и России. Мы не занимаемся накруткой цены, вы точно знаете, за что платите. Просто Окна – с нами просто.'
    data.left_menu_active = 0

    // Секция 1
    const IndexS1 = require('./models').index_s1
    const IndexS1Action = require('./models').index_s1_action
    data.s1 = {}
    data.s1.left = await IndexS1.findByPk(1)
    data.s1.actions = await IndexS1Action.findAll({
        where: {
            iActive: true
        },
        order: [
            ['iOrder', 'ASC'],
            ['s1ActionID', 'ASC']
        ]
    })

    // Менюшка окон
    let MaterialBrandProductMenu = []
    let product = await Product.findAll({
        attributes: ['iProductID', 'iMaterialID', 'iBrandID', 'sProductTitle', 'sProductURI'],
        include: [
            {
                model: Brand,
                attributes: ['iBrandID', 'sBrandTitle', 'sBrandURI'],
                where: {
                    iActive: 1
                }
            },
            {
                model: Material,
                attributes: ['iMaterialID', 'sMaterialTitle'],
                where: {
                    iActive: 1
                }
            },
            {
                model: Material_category,
                attributes: ['iMaterialCategoryID', 'iMaterialID', 'sMaterialCategoryTitle'],
            },
        ],
        where: {
            iActive: 1
        },
    })
    product.forEach((p) => {
        let checkMaterial = MaterialBrandProductMenu.find(function (material) {
            return material.iMaterialID == p.iMaterialID
        })

        // category
        if (!checkMaterial) {
            MaterialBrandProductMenu.push({
                iMaterialID: p.material.iMaterialID,
                title: p.material.sMaterialTitle[0].toUpperCase() + p.material.sMaterialTitle.slice(1),
                uri: '#',
                list: []
            })
        }

        // material_category
        if (p.material_category) {
            let material_item = MaterialBrandProductMenu.find(function (material) {
                return material.iMaterialID == p.iMaterialID
            })
            let material_category_item = material_item.list.find(function (material_category) {
                return material_category.iMaterialCategoryID == p.material_category.iMaterialCategoryID
            })
            if (!material_category_item) {
                material_item.list.push({
                    iMaterialCategoryID: p.material_category.iMaterialCategoryID,
                    title: p.material_category.sMaterialCategoryTitle[0].toUpperCase() + p.material_category.sMaterialCategoryTitle.slice(1),
                    uri: '#',
                    list: []
                })
            }
        }

    })

    product.forEach((p) => {
        var product_item = {
            title: p.brand.sBrandTitle + ' ' + p.sProductTitle,
            uri: '/product/' + p.sProductURI
        }
        var material = MaterialBrandProductMenu.find(x => x.iMaterialID == p.iMaterialID)
        if (p.material_category) {
            var material = material.list.find(x => x.iMaterialCategoryID == p.material_category.iMaterialCategoryID)
        }
        var brand = material.list.find(x => x.iBrandID == p.brand.iBrandID)
        if (!brand) {
            material.list.push({
                iBrandID: p.brand.iBrandID,
                title: p.brand.sBrandTitle,
                uri: '#',
                list: [product_item]
            })
        } else {
            brand.list.push(product_item)
        }

        
    })
    // Менюшка окон END


    
    MaterialBrandProductMenu.push({
        title: 'Дизайн окна',
        uri: '#',
        list: [
            {
                title: 'Каталог ламинации',
                dev: true
            },
            {
                title: 'Каталог RAL',
                uri: '/palette'
            }
        ]
    }, {
        title: 'Опции',
        uri: '/options'
    }, {
        title: 'Видео "Как просто выбрать окно"',
        uri: '#s3'
    },
    {
        title: 'Интуйтивный выбор окон',
        uri: '/intuitive'
    },
    {
        title: 'Избранное',
        uri: '/favorites'
    })


    // res.json(product)
    // res.json(MaterialBrandProductMenu)
    // return false

    const Part = require('./models').part
    const partList = await Part.findAll({
        attributes: [
            'sPartTitle',
            'sPartURI'
        ],
        where: {
            iActive: true
        },
        order: [
            ['iOrder', 'ASC']
        ]
    })
    const menuPartList = []
    partList.forEach(part => {
        menuPartList.push({
            title: part.sPartTitle,
            uri: '/part/' + part.sPartURI
        })
    })

    data.s2_menu = [
        {
            title: 'Окна',
            ico: 'windows',
            list: MaterialBrandProductMenu
        },
        {
            title: 'Услуги',
            ico: 'services',
            list: [
                {
                    title: 'Вызов замерщика',
                    uri: '/gager'
                },
                {
                    title: 'Своими руками',
                    uri: '#',
                    list: [
                        {
                            title: 'Регулировка фурнитуры',
                            uri: '/regulation_window'
                        },
                        {
                            title: 'Инструкция по самостоятельному замеру',
                            uri: '/optional_service'
                        },
                    ]
                },
                {
                    title: 'Установка окон',
                    uri: '#',
                    dev: true,
                    list: [
                        {
                            title: 'Установка от Просто Окна',
                            uri: '#',
                            list: [
                                {
                                    title: 'Премиум монтаж',
                                    uri: '#'
                                },
                                {
                                    title: '10 плюсов монтажа от Просто Окна',
                                    uri: '#'
                                },
                                {
                                    title: 'Гарантия',
                                    uri: '#'
                                },
                            ]
                        },
                    ]
                },
                {
                    title: 'Установка откосов',
                    uri: '#',
                    dev: true
                },
                {
                    title: 'Установка подоконников',
                    uri: '#',
                    dev: true,
                    list: [
                        {
                            title: 'Заделка шва под подоконником',
                            uri: '#'
                        }
                    ]
                },
                {
                    title: 'Отделка балконов',
                    uri: '#',
                    dev: true,
                    list: [
                        {
                            title: 'Построение крыши',
                            uri: '#'
                        },
                        {
                            title: 'Построение выноса',
                            uri: '#'
                        },
                        {
                            title: 'Обшивка балконов',
                            uri: '#'
                        },
                        {
                            title: 'Материалы для отделки',
                            uri: '#'
                        },
                    ]
                },
                {
                    title: 'Окосячка',
                    dev: true,
                    uri: '#'
                },
                {
                    title: 'Вывоз мусора',
                    dev: true,
                    uri: '#'
                },
                {
                    title: 'Клининг после установки',
                    dev: true,
                    uri: '#'
                },
                {
                    title: 'Доставка',
                    dev: true,
                    uri: '#'
                },
                {
                    title: 'Сервисное обслуживание',
                    dev: true,
                    uri: '#'
                },
            ]
        },
        {
            title: 'Комплектующие',
            ico: 'accessories',
            list: menuPartList
        },
        {
            title: 'Цены',
            ico: 'prices',
            list: [
                {
                    title: 'Калькулятор',
                    uri: '#s6',
                    dev: true
                },
                {
                    title: 'Заказать точный расчёт',
                    uri: '/calculation'
                },
                {
                    title: 'Лучшая цена',
                    uri: '#',
                    dev: true
                },
                {
                    title: 'Оплата',
                    uri: '/pay'
                },
                {
                    title: 'Цены по типу дома',
                    uri: '#',
                    dev: true
                },
                {
                    title: 'Рассрочка',
                    uri: '#',
                    dev: true
                },
            ]
        },
        {
            title: 'Wiki окна',
            ico: 'wiki-windows',
            list: [
                {
                    title: 'Словарь оконных терминов',
                    uri: '#',
                    dev: true
                },
                {
                    title: 'История',
                    uri: '#',
                    dev: true
                },
                {
                    title: 'Профили',
                    uri: '#',
                    dev: true
                },
                {
                    title: 'Сравнительные характеристики профильных систем',
                    uri: '#',
                    dev: true
                },
                {
                    title: 'Фурнитура',
                    uri: '#',
                    dev: true
                },
                {
                    title: 'Стекло и стеклопакеты',
                    uri: '#',
                    dev: true
                },
                {
                    title: 'Монтаж',
                    uri: '#',
                    dev: true
                },
                {
                    title: 'Балконы',
                    uri: '#',
                    dev: true
                },
                {
                    title: 'Двери',
                    uri: '#',
                    dev: true
                },
            ]
        },
        {
            title: 'Корпоративным клиентам',
            ico: 'corporate-clients',
            list: [
                {
                    title: 'Страница с описанием',
                    uri: '/corporate'
                },
                {
                    title: 'PDF презентация для скачивания',
                    uri: '#',
                    dev: true
                },
                {
                    title: 'Услуги корпоративного монтажа',
                    uri: '#',
                    dev: true
                },
                {
                    title: 'Личный кабинет',
                    uri: '#',
                    dev: true
                },
            ]
        },
        {
            title: 'Акции/новое',
            ico: 'stocks',
            list: [
                {
                    title: 'Акция "Найдите дешевле"',
                    uri: '/best-cost'
                }
            ]
        },
        {
            title: 'Компания',
            ico: 'company',
            list: [
                {
                    title: 'Контакты',
                    uri: '/contact'
                },
                {
                    title: 'О компании',
                    uri: '/company'
                },
                {
                    title: 'Как мы работаем',
                    uri: '/work'
                },
                {
                    title: 'Гарантия',
                    uri: '#',
                    dev: true
                },
                {
                    title: 'Новости',
                    uri: '/news'
                },
                {
                    title: 'Инновации',
                    uri: '#',
                    list: [
                        {
                            title: 'Заработайте с нами',
                            uri: '#',
                            dev: true
                        },
                        {
                            title: 'Вместе еще дешевле',
                            uri: '/cheaper-together'
                        },
                        {
                            title: 'Освященные окна',
                            uri: '#',
                            dev: true
                        },
                        {
                            title: 'Благотворительность',
                            uri: '#',
                            dev: true
                        },
                    ]
                },
            ]
        },
    ]

    // Пятая секция / Галлерея
    data.s5 = await GalleryIndex.list({ iActive: true })
    // return res.json(data)
    res.render('index.pug', data)
})

app.get('/calc_data', (req, res) => {
    fs.readFile('./public/calc_data.json', 'utf8', function (err, data) {
        if (err) throw err
        res.json(JSON.parse(data))
    })
})

app.get('/contact', (req, res) => {
    data.title = 'Контакты'
    data.description = ''
    data.left_menu_active = null
    res.render('contact.pug', data)
})

app.get('/gager', (req, res) => {
    data.title = 'Замерщик'
    data.description = ''
    data.left_menu_active = null
    res.render('gager.pug', data)
})

app.get('/product', async (req, res) => {
    data.title = 'Окна'
    data.description = ''
    data.left_menu_active = 1
    data.product = null
    // data.products = await Product.findAll({
    //     attributes: ['sProductTitle', 'sProductURI'],
    //     include: [
    //         {
    //             model: Brand,
    //             attributes: ['sBrandTitle']
    //         }
    //     ]
    // })
    // res.json(data.productMenu)
    res.render('product/products.pug', data)
})

app.get('/product/:sProductURI', async (req, res) => {
    // console.log('product page', req.params.sProductURI)
    data.title = 'Окна'
    data.description = ''
    data.left_menu_active = 1
    data.products = await Product.findAll({
        attributes: ['sProductTitle', 'sProductURI'],
        include: [
            {
                model: Brand,
                attributes: ['sBrandTitle']
            },
            {
                model: Material,
                attributes: ['sMaterialTitle']
            },
            {
                model: Brus
            }

        ]
    })
    data.material = await Material.findAll()
    data.brus = await Brus.findAll()

    data.product = await Product.getProduct(req.params.sProductURI)

    // res.json(data.product)
    res.render('product.pug', data)
})

app.get('/pay', (req, res) => {
    data.title = 'Оплата'
    data.description = ''
    data.left_menu_active = null
    res.render('pay.pug', data)
})

app.get('/palette', (req, res) => {
    data.title = 'Палитра'
    data.description = ''
    data.left_menu_active = null
    res.render('palette.pug', data)
})

app.get('/options', (req, res) => {
    data.title = 'Опции'
    data.description = ''
    data.left_menu_active = null
    res.render('options.pug', data)
})



data.catalog = []
var catalog_item = {
    title: "Особые стекла для пластиковых окон ПВХ",
    desc: "Стеклопакет – важнейший элемент ПВХ окна. От его качества зависят ведущие свойства окна из пластика в целом – шумоизоляция, параметры сохранения тепла в жилище и даже безопасность проживающих в помещении. Чтобы пластиковые окна ПВХ"
}
for (let index = 0; index < 10; index++) {
    data.catalog.push(catalog_item);
}

app.get('/wiki', (req, res) => {
    data.title = 'Вики'
    data.description = ''
    data.left_menu_active = 6
    res.render('wiki/catalog.pug', data)
})

app.get('/wiki/get', (req, res) => {
    res.render('wiki/catalog_list.pug', data)
})

app.get('/wiki/article', (req, res) => {
    data.title = 'Wiki article'
    data.description = ''
    data.left_menu_active = 6
    res.render('wiki/article.pug', data)
})

app.get('/instruction', (req, res) => {
    data.title = 'Instruction'
    data.description = ''
    data.left_menu_active = null
    res.render('instruction/instruction.pug', data)
})

app.get('/instruction/video', (req, res) => {
    data.title = 'Instruction Video'
    data.description = ''
    data.left_menu_active = null
    res.render('instruction/video.pug', data)
})

app.get('/company', (req, res) => {
    data.title = 'О компании'
    data.description = ''
    data.left_menu_active = null
    res.render('company/company.pug', data)
})

app.get('/cheaper-together', (req, res) => {
    data.title = 'Вместе еще дешевле'
    data.description = ''
    data.left_menu_active = null
    res.render('company/innovation/cheaper-together.pug', data)
})

app.get('/news', (req, res) => {
    data.title = 'news'
    data.description = ''
    data.left_menu_active = null
    //где апи по новостям и запросы??
    res.render('company/news/news.pug', data)
})

app.get('/news-tape', (req, res) => {
    data.title = 'news-tape'
    data.description = ''
    data.left_menu_active = null
    //где апи по новостям и запросы??
    res.render('company/news/news-tape.pug', data)
})

app.get('/favorites', (req, res) => {
    data.title = 'favorites'
    data.description = ''
    data.left_menu_active = null
    //где апи по новостям и запросы??
    res.render('favorites/favorites.pug', data)
})

app.get('/brand/:sBrandURI', async (req, res) => {
    data.brands = await Brand.findAll({
        where: {
            iActive: 1
        }
    })
    var brand = await Brand.findAll({
        where: {
            sBrandURI: req.params.sBrandURI,
            iActive: 1,
        }
    })
    if (brand[0]) {
        data.product = await Product.findAll({
            where: {
                iBrandID: brand[0].iBrandID,
                iActive: 1,
            },
            include: [
                {
                    model: Material
                },
                {
                    model: Material_category
                },
                {
                    model: Brus
                },
                {
                    model: Product_image
                },
                {
                    model: Product_color,
                    required: false,
                    where: {
                        iIndex: 1
                    }
                }
            ],
            order: [
                [Product_image, 'iOrder', 'ASC']
            ]
        })
        data.brand = brand[0]
        data.title = brand[0].sBrandTitle
        data.description = ''
        data.left_menu_active = 1
        // Делаем колхоз на заглавную букву для sMaterialCategoryTitle
        data.product.forEach(x => {
            if (x.material_category) {
                x.material_category.sMaterialCategoryTitle = x.material_category.sMaterialCategoryTitle[0].toUpperCase() + x.material_category.sMaterialCategoryTitle.slice(1)
            }
        })
        // res.json(data.product)
        res.render('page-brand/page-brand.pug', data)
    } else {
        res.status(404).send('Sorry cant find that!')
    }
})

app.get('/best-cost', (req, res) => {
    data.title = 'best-cost'
    data.left_menu_active = null
    //где апи по новостям и запросы??
    res.render('best-cost/best-cost.pug', data)
})
//app.get('/cheaper-together', (req, res) => {
//res.render('company/company.pug', data)
//})

app.get('/corporate', (req, res) => {
    data.title = 'Corporate'
    data.description = ''
    data.left_menu_active = null
    res.render('corporate/corporate.pug', data)
})

app.get('/regulation_window', (req, res) => {
    data.title = 'Регулировка окон'
    data.description = ''
    data.left_menu_active = null
    res.render('regulation_window/regulation_window.pug', data)
})

app.get('/optional_service', (req, res) => {
    data.title = 'Дополнительные услуги'
    data.description = ''
    data.left_menu_active = null
    res.render('optional_service/optional_service.pug', data)
})

app.get('/intuitive', (req, res) => {
    data.title = 'Интуйтивный подбор окон'
    data.description = ''
    data.left_menu_active = null
    res.render('intuitive/intuitive.pug', data)
})

app.get('/gallery', async (req, res) => {
    data.title = 'Галлерея'
    data.description = ''
    data.left_menu_active = 3
    data.gallery_group = await Gallery_group.findAll()
    data.gallery_group_active = false
    data.gallery = await Gallery.getList()
    res.render('gallery', data)
})
app.get('/gallery/:sGalleryGroupUri', async (req, res) => {
    data.title = 'Галлерея'
    data.description = ''
    data.left_menu_active = 3
    data.gallery_group = await Gallery_group.findAll()
    data.gallery_group_active = req.params.sGalleryGroupUri
    data.gallery = await Gallery.getList({
        sGalleryGroupUri: req.params.sGalleryGroupUri
    })
    res.render('gallery', data)
})
app.get('/gallery/:sGalleryGroupUri/:iGalleryID', async (req, res) => {
    data.title = 'Галлерея ' + req.params.iGalleryID
    data.description = ''
    data.left_menu_active = 3
    data.gallery_group = await Gallery_group.findAll()
    data.gallery_group_active = req.params.sGalleryGroupUri
    data.gallery_list = await Gallery.getList({
        sGalleryGroupUri: req.params.sGalleryGroupUri
    })
    data.gallery = await Gallery.getList({
        iGalleryID: req.params.iGalleryID
    })
    // res.json(data.gallery_list)
    res.render('gallery/item', data)
})
app.get('/work', async (req, res) => {
    data.title = 'Как мы работаем'
    data.description = ''
    data.left_menu_active = 5
    res.render('work', data)
})
app.get('/calculation', async (req, res) => {
    data.title = 'Заказать точный расчет'
    data.description = ''
    data.left_menu_active = null
    res.render('calculation', data)
})
app.get('/accessories', async (req, res) => {
    data.title = 'Шторы'
    data.description = ''
    data.left_menu_active = null
    res.render('accessories/access.pug', data)
})
app.get('/mesh', async (req, res) => {
    data.title = 'Сетки'
    data.description = ''
    data.left_menu_active = null
    res.render('accessories/mesh.pug', data)
})
app.get('/jalousie', async (req, res) => {
    data.title = 'Жалюзи'
    data.description = ''
    data.left_menu_active = null
    res.render('accessories/jalousie.pug', data)
})
app.get('/handle', async (req, res) => {
    data.title = 'Ручки'
    data.description = ''
    data.left_menu_active = null
    res.render('accessories/handle.pug', data)
})
app.get('/flap', async (req, res) => {
    data.title = 'Клапаны'
    data.description = ''
    data.left_menu_active = null
    res.render('accessories/flap.pug', data)
})
app.get('/windowsill', async (req, res) => {
    data.title = 'Подоконники'
    data.description = ''
    data.left_menu_active = null
    res.render('accessories/windowsill.pug', data)
})

app.get('/part', async (req, res) => {
    const Part = require('./models').part
    var part = await Part.findOne({
        where: {
            iActive: true
        },
        order: [
            ['iOrder', 'ASC']
        ]
    })
    if (part) return res.redirect('/part/' + part.sPartURI)
    res.sendStatus(404)
})
app.get('/part/:sPartURI', async (req, res) => {
    const sPartURI = req.params.sPartURI
    const Part = require('./models').part
    const part = await Part.findOne({
        where: {
            sPartURI
        }
    })
    const iPartID = part.iPartID
    const PartBrand = require('./models').partBrand
    const partBrand = await PartBrand.findOne({
        where: {
            iPartID,
            iActive: 1
        },
        order: [
            ['iOrder', 'ASC']
        ]
    })
    if (partBrand) return res.redirect('/part/' + part.sPartURI + '/' + partBrand.sPartBrandURI)
    res.sendStatus(404)
})
app.get('/part/:sPartURI/:sPartBrandURI', async (req, res) => {
    const Part = require('./models').part
    const PartBrand = require('./models').partBrand
    const PartModel = require('./models').partModel

    const sPartURI = req.params.sPartURI
    const sPartBrandURI = req.params.sPartBrandURI

    const partBrand = await PartBrand.findOne({
        where: {
            sPartBrandURI,
            iActive: true
        },
        order: [
            ['iOrder', 'ASC']
        ]
    })

    const iPartBrandID = partBrand.iPartBrandID

    const partModel = await PartModel.findOne({
        where: {
            iPartBrandID,
            iActive: true
        },
        order: [
            ['iOrder', 'ASC']
        ]
    })

    if (partModel) return res.redirect('/part/' + sPartURI + '/' + sPartBrandURI + '/' + partModel.sPartModelURI)
    res.sendStatus(404)
})
app.get('/part/:sPartURI/:sPartBrandURI/:sPartModelURI', async (req, res) => {
    const Part = require('./models').part
    const PartBrand = require('./models').partBrand
    const PartModel = require('./models').partModel

    const sPartURI = req.params.sPartURI
    const sPartBrandURI = req.params.sPartBrandURI
    const sPartModelURI = req.params.sPartModelURI

    data.part = await Part.findOne({
        where: {
            sPartURI
        }
    })
    const iPartID = data.part.iPartID

    data.brands = await PartBrand.findAll({
        where: {
            iPartID,
            iActive: true
        },
        order: [
            ['iOrder', 'ASC']
        ]
    })

    data.parts = await Part.findAll({
        where: {
            iActive: true
        },
        order: [
            ['iOrder', 'ASC']
        ]
    })


    const brand = await PartBrand.findOne({
        where: {
            sPartBrandURI,
            iActive: true
        }
    })
    const iPartBrandID = brand.iPartBrandID

    const model = await PartModel.findOne({
        where: {
            sPartModelURI,
            iActive: true
        }
    })
    const iPartModelID = model.iPartModelID

    data.model = await PartModel.get(iPartModelID)

    data.models = await PartModel.list({ iPartBrandID })

    // return res.json(data)
    // res.render('part/handle.pug', data)
    res.render('accessories/handle.pug', data)
})




app.post('/send', async (req, res) => {
    var dir_name = randomString()
    var dir = './public/upload/' + dir_name;
    var upload_files = []

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dir)
        },
        filename: function (req, file, cb) {
            upload_files.push(file.originalname)
            cb(null, file.originalname)
        }
    })

    var upload = multer({ storage: storage }).array('file[]')

    upload(req, res, function (err, responce) {
        var message_html = "";
        var name = (req.body.name && req.body.name != 'undefined') ? req.body.name : false
        var tel = (req.body.tel && req.body.tel != 'undefined') ? req.body.tel : false
        var email = (req.body.email && req.body.email != 'undefined') ? req.body.email : false
        var from = (req.body.from && req.body.from != 'undefined') ? req.body.from : false
        var to = (req.body.to && req.body.to != 'undefined') ? req.body.to : false
        var subject = (req.body.subject && req.body.subject != 'undefined') ? req.body.subject : false
        var message = (req.body.message && req.body.message != 'undefined') ? req.body.message : false
        var page_path = (req.body.page_path && req.body.page_path != 'undefined') ? req.body.page_path : false


        if (name) {
            message_html += "<p>Имя: <b>" + name + "</b></p>"
        } else {
            res.json({ error: ['name'] })
            return false
        }
        if (tel) {
            message_html += "<p>Телефон: <b>" + tel + "</b></p>"
        } else {
            res.json({ error: ['tel'] })
            return false
        }
        if (email) {
            message_html += "<p>Электронная почта: <b>" + email + "</b></p>"
        }
        if (from) {
            message_html += "<p>Время звонка от: <b>" + from + "</b></p>"
        }
        if (to) {
            message_html += "<p>Время звонка до: <b>" + to + "</b></p>"
        }
        if (subject) {
            message_html += "<p>Источник: <b>" + subject + "</b></p>"
        }
        if (page_path) {
            message_html += "<p>Страница: <b>" + page_path + "</b></p>"
        }
        if (message) {
            message_html += "<p>Сообщение: <b>" + message + "</b></p>"
        }
        message_html += "<p>id: " + dir_name + "</p>"


        var path = require('path')
        var filepath = [];
        upload_files.forEach(file => {
            filepath.push(path.join(dir, file))
        })

        var data = {
            from: 'prostokna.ru <noreply@prostokna.ru>',
            to: '<davydova.o@prostokna.ru>, <prosto.pochta2013@mail.ru>, <viki.z@prostokna.ru>',
            subject: 'Заявка: ' + subject,
            text: message_html,
            html: message_html,
            attachment: filepath
        };

        var mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN })
        mailgun.messages().send(data, function (error, body) {
            res.json(200)
        })
    })
})

app.post('/send2', async (req, res) => {
    console.log(req.body)
    res.json(req.body.name)
})


//API
app.get('/all_windows', async (req, res) => {
    var result = await Product.findAll({
        include: [
            {
                model: Brand
            }
        ]
    })
    res.json(result)
    // let connection = mysql.createConnection(config.get('db'))
    // let query = "SELECT t1.sProductTitle, t1.MountingDepth, t1.Profile, t1.ProfileClass, t1.DoubleGlazing, t1.HeatTransferResistance, t1.ShapikShapeOptions, t1.DecorationOptions, t1.FrameFeature, t2.BrandНomeland, t2.sBrandTitle FROM product t1 LEFT JOIN brand t2 ON t2.iBrandID = t1.iBrandID";

    // connection.query(query, (err, rows, fields) => {
    //     if (err) {
    //         console.log('Error query: ' + err)
    //         res.sendStatus(500)
    //         return
    //     }
    //     res.json(rows)
    // })
    // connection.end()
})

app.get('/compare', async (req, res) => {
    const response = {}
    response.material = await Material.findAll({
        attributes: ['iMaterialID', 'sMaterialTitle'],
        where: {
            iActive: true
        }
    })
    response.product = await Product.getProductForCompare()
    
    res.json(response)
})



if (process.env.NODE_ENV != 'development') {
    var https_options = {
        key: fs.readFileSync("encryption/private.key"),
        cert: fs.readFileSync("encryption/server.crt"),
        ca: [
            fs.readFileSync('encryption/mydomain.ca-bundle')
        ]
    }

    const https = require('https').createServer(https_options, app)
    https.listen(443, () => {
        console.log('Server https is running')
    })
}
app.listen(process.env.PORT, () => {
    console.log('Server is running http://localhost:' + process.env.PORT)
})

// http.listen(process..env.PORT || 8080, () => {
//     // console.clear()
//     console.log('Server is running on http://localhost:' + process..env.PORT || 8080)
// })
