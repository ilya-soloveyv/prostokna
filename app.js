const express = require('express')
const app = express()
const http = require('http').createServer(app)
const config = require('config')
const pug = require('pug')
require('dotenv').config()
const mysql = require('mysql')
const async = require('async')
const cookieParser = require('cookie-parser')
const fs = require('fs')
app.use(cookieParser())
app.locals.env = process.env;
app.use(express.static('public'));
app.set('view engine', 'pug');

app.use('/vue', express.static(__dirname + '/node_modules/vue/dist'))

var data = {}
data.left_menu = [
    {
        title: 'Главная',
        uri: '/',
        ico: [ '1.svg', '1a.svg' ]
    },
    {
        title: 'Окна',
        uri: '/product',
        ico: [ '2.svg', '2a.svg' ]
    },
    {
        title: 'Без имени',
        uri: '/',
        ico: [ '3.svg', '3a.svg' ]
    },
    {
        title: 'Без имени',
        uri: '/',
        ico: [ '4.svg', '4a.svg' ]
    },
    {
        title: 'Без имени',
        uri: '/',
        ico: [ '5.svg', '5a.svg' ]
    },
    {
        title: 'Без имени',
        uri: '/',
        ico: [ '6.svg', '6a.svg' ]
    },
    {
        title: 'Wiki',
        uri: '/wiki',
        ico: [ '7.svg', '7a.svg' ]
    },
    {
        title: 'Без имени',
        uri: '/',
        ico: [ '8.svg', '8a.svg' ]
    },
]

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

app.get('/', (req, res) => {
    data.title = 'Просто окна'
    data.s2_menu = [
        {
            title: 'Окна',
            img: '1.svg',
            list: [
                {
                    title: 'Пластик',
                    uri: '#',
                    list: [
                        {
                            title: 'Rehau',
                            uri: '#',
                            list: [
                                {
                                    title: 'Euro',
                                    uri: '/product/rehau_euro'
                                },
                                {
                                    title: 'Blitz New',
                                    uri: '/product/rehau_blitz_new'
                                },
                                {
                                    title: 'Grazio',
                                    uri: '/product/rehau_grazio'
                                },
                                {
                                    title: 'Delight',
                                    uri: '/product/rehau_delight'
                                },
                                {
                                    title: 'Brillant',
                                    uri: '/product/rehau_brillant'
                                },
                                {
                                    title: 'Intelio',
                                    uri: '/product/rehau_intelio'
                                },
                                {
                                    title: 'Geneo',
                                    uri: '/product/rehau_geneo'
                                },
                            ]
                        },
                        {
                            title: 'KBE',
                            uri: '#',
                            list: [
                                {
                                    title: 'KBE 58',
                                    uri: '/product/kbe_58'
                                },
                                {
                                    title: 'KBE 70 Expert',
                                    uri: '/product/kbe_expert'
                                },
                                {
                                    title: 'KBE 76',
                                    uri: '/product/kbe_76'
                                },
                            ]
                        },
                        {
                            title: 'Montblanc',
                            uri: '#',
                            list: [
                                {
                                    title: 'Eco',
                                    uri: '/product/montblanc_eco'
                                },
                                {
                                    title: 'Nord',
                                    uri: '/product/montblanc_nord'
                                },
                                {
                                    title: 'Thermo',
                                    uri: '#'
                                },
                            ]
                        },
                        {
                            title: 'Novotex',
                            uri: '#',
                            list: [
                                {
                                    title: 'Techno 58',
                                    uri: '/product/novotex_techno_58'
                                },
                                {
                                    title: 'Techno 70',
                                    uri: '/product/novotex_techno_70'
                                },
                            ]
                        },
                        {
                            title: 'Wintech',
                            uri: '#',
                            list: [
                                {
                                    title: 'Isotech 530',
                                    uri: '/product/wintech_isotek_530'
                                },
                                {
                                    title: 'Thermotech 742',
                                    uri: '/product/wintech_thermotek_742'
                                },
                            ]
                        },
                        {
                            title: 'Gutwerk',
                            uri: '#',
                            list: [
                                {
                                    title: 'Gutwerk 58',
                                    uri: '/product/kbe_gut_gutwerk_58'
                                },
                                {
                                    title: 'Gutwerk 70',
                                    uri: '/product/kbe_master_gutwerk'
                                },
                            ]
                        },
                        {
                            title: 'Slidors',
                            uri: '#'
                        },
                    ]
                },
                {
                    title: 'Алюминий',
                    uri: '#',
                    list: [
                        {
                            title: 'Seal',
                            uri: '#',
                            list: [
                                {
                                    title: 'КПТ 45',
                                    uri: '/product/seal_45'
                                },
                                {
                                    title: 'КПТ 74',
                                    uri: '/product/seal_74'
                                },
                                {
                                    title: 'КП 50',
                                    uri: '/product/seal_kp50'
                                },
                            ]
                        },
                        {
                            title: 'Alutech',
                            uri: '#',
                            list: [
                                {
                                    title: 'ALT C48',
                                    uri: '/product/alutech_alt_c48'
                                },
                                {
                                    title: 'ALT W62',
                                    uri: '/product/alutech_alt_w62'
                                },
                                {
                                    title: 'F50',
                                    uri: '/product/alutech_f50'
                                },
                            ]
                        },
                        {
                            title: 'Provedal',
                            uri: '#',
                            list: [
                                {
                                    title: 'p480',
                                    uri: '#'
                                },
                                {
                                    title: 'c640',
                                    uri: '#'
                                },
                            ]
                        },
                    ]
                },
                {
                    title: 'Дерево евробрус',
                    uri: '#',
                    list: [
                        {
                            title: 'Сосна',
                            uri: '#',
                            list: [
                                {
                                    title: 'Эконом',
                                    uri: '#'
                                },
                                {
                                    title: 'Сращенный евробрус',
                                    uri: '/product/sosna_srashchennaya'
                                },
                                {
                                    title: 'Цельный евробрус',
                                    uri: '/product/sosna_tselnolamelnaya'
                                },
                            ]
                        },
                        {
                            title: 'Лиственница',
                            uri: '#',
                            list: [
                                {
                                    title: 'Сращенный евробрус',
                                    uri: '/product/listvennitsa_srashchennaya'
                                },
                                {
                                    title: 'Цельный евробрус',
                                    uri: '/product/listvennitsa_tselnolamelnaya'
                                },
                            ]
                        },
                        {
                            title: 'Дуб',
                            uri: '#',
                            list: [
                                {
                                    title: 'Сращенный евробрус',
                                    uri: '/product/dub_srashchennaya'
                                },
                                {
                                    title: 'Цельный евробрус',
                                    uri: '/product/dub_tselnolamelnaya'
                                },
                            ]
                        },
                        {
                            title: 'Меранти',
                            uri: '#'
                        },
                    ]
                },
                {
                    title: 'Дизайн окна',
                    uri: '#',
                    list: [
                        {
                            title: 'Каталог ламинации',
                            uri: '/palette'
                        },
                        {
                            title: 'Каталог RAL',
                            uri: '/palette'
                        }
                    ]
                },
                {
                    title: 'Опции',
                    uri: '/options'
                },
                {
                    title: 'Видео "Как просто выбрать окно"',
                    uri: '#s3'
                },
                {
                    title: 'Интуйтивный выбор окон',
                    uri: '/intuitive'
                },
            ]
        },
        {
            title: 'Услуги',
            img: '2.svg',
            list: [
                {
                    title: 'Вызов замерщика',
                    uri: '/gager'
                },
                {
                    title: 'Установка окон',
                    uri: '#',
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
                        {
                            title: 'Своими руками',
                            uri: '#',
                            list: [
                                {
                                    title: 'Обучение монтажу',
                                    uri: '#'
                                },
                                {
                                    title: 'Регулировка',
                                    uri: '/regulation_window'
                                },
                                {
                                    title: 'Инструкция по предварительному замеру',
                                    uri: '/optional_service'
                                },
                            ]
                        },
                    ]
                },
                {
                    title: 'Установка откосов',
                    uri: '#'
                },
                {
                    title: 'Установка подоконников',
                    uri: '#',
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
                    uri: '#'
                },
                {
                    title: 'Вывоз мусора',
                    uri: '#'
                },
                {
                    title: 'Клининг после установки',
                    uri: '#'
                },
                {
                    title: 'Доставка',
                    uri: '#'
                },
                {
                    title: 'Сервисное обслуживание',
                    uri: '#'
                },
            ]
        },
        {
            title: 'Комплектующие',
            img: '3.svg',
            list: [
                {
                    title: 'Подоконники',
                    uri: '#',
                    list: [
                        {
                            title: 'Каталог с ценами',
                            uri: '/options'
                        }
                    ]
                },
                {
                    title: 'Ручки',
                    uri: '#',
                    list: [
                        {
                            title: 'Каталог с ценами',
                            uri: '/options'
                        }
                    ]
                },
                {
                    title: 'Шторы',
                    uri: '#',
                    list: [
                        {
                            title: 'Каталог с ценами',
                            uri: '/options'
                        }
                    ]
                },
                {
                    title: 'Жалюзи',
                    uri: '#',
                    list: [
                        {
                            title: 'Каталог с ценами',
                            uri: '/options'
                        }
                    ]
                },
                {
                    title: 'Клапаны',
                    uri: '#',
                    list: [
                        {
                            title: 'Каталог с ценами',
                            uri: '/options'
                        }
                    ]
                },
                {
                    title: 'Москитные сетки',
                    uri: '#',
                    list: [
                        {
                            title: 'Каталог с ценами',
                            uri: '/options'
                        }
                    ]
                },
            ]
        },
        {
            title: 'Цены',
            img: '4.svg',
            list: [
                {
                    title: 'Калькулятор',
                    uri: '#s6'
                },
                {
                    title: 'Заказать расчет',
                    uri: '#'
                },
                {
                    title: 'Лучшая цена',
                    uri: '#'
                },
                {
                    title: 'Оплата',
                    uri: '/pay'
                },
                {
                    title: 'Цены по типу дома',
                    uri: '#'
                },
                {
                    title: 'Рассрочка',
                    uri: '#'
                },
            ]
        },
        {
            title: 'Wiki окна',
            img: '5.svg',
            list: [
                {
                    title: 'Словарь оконных терминов',
                    uri: '/wiki'
                },
                {
                    title: 'История',
                    uri: '/wiki'
                },
                {
                    title: 'Профили',
                    uri: '/wiki'
                },
                {
                    title: 'Сравнительные характеристики профильных систем',
                    uri: '/wiki'
                },
                {
                    title: 'Фурнитура',
                    uri: '/wiki'
                },
                {
                    title: 'Стекло и стеклопакеты',
                    uri: '/wiki'
                },
                {
                    title: 'Монтаж',
                    uri: '/wiki'
                },
                {
                    title: 'Балконы',
                    uri: '/wiki'
                },
                {
                    title: 'Двери',
                    uri: '/wiki'
                },
            ]
        },
        {
            title: 'Корпоративным клиентам',
            img: '6.svg',
            list: [
                {
                    title: 'Страница с описанием',
                    uri: '/corporate'
                },
                {
                    title: 'PDF презентация для скачивания',
                    uri: '#'
                },
                {
                    title: 'Услуги корпоративного монтажа',
                    uri: '#'
                },
                {
                    title: 'Личный кабинет',
                    uri: '#'
                },
            ]
        },
        {
            title: 'Акции/новое',
            img: '7.svg',
            list: [
                {
                    title: 'Акция "Найдите дешевле"',
                    uri: '#'
                }
            ]
        },
        {
            title: 'Компания',
            img: '8.svg',
            list: [
                {
                    title: 'Контакты',
                    uri: '/contact'
                },
                {
                    title: 'О компании',
                    uri: '#'
                },
                {
                    title: 'Как мы работаем',
                    uri: '#'
                },
                {
                    title: 'Гарантия',
                    uri: '#'
                },
                {
                    title: 'Новости',
                    uri: '#'
                },
                {
                    title: 'Инновации',
                    uri: '#',
                    list: [
                        {
                            title: 'Заработайте с нами',
                            uri: '#'
                        },
                        {
                            title: 'Вместе еще дешевле',
                            uri: '#'
                        },
                        {
                            title: 'Освященные окна',
                            uri: '#'
                        },
                        {
                            title: 'Благотворительность',
                            uri: '#'
                        },
                    ]
                },
            ]
        },
    ]
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
    res.render('contact.pug', data)
})

app.get('/gager', (req, res) => {
    data.title = 'Замерщик'
    res.render('gager.pug', data)
})

app.get('/product', (req, res) => {
    data.title = 'Окна'
    let connection = mysql.createConnection(config.get('db'))
    let query = "SELECT * FROM product t1 LEFT JOIN brand t2 ON t2.iBrandID = t1.iBrandID";
    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.log('Error query: ' + err)
            res.sendStatus(500)
            return
        }
        data.products = rows;
        res.render('product/products.pug', data)
    })
    connection.end()
})

app.get('/product/:sProductURI', (req, res) => {
    var connection = mysql.createConnection(config.get('db'));
    var query_1 = "SELECT * FROM product t1 LEFT JOIN brand t2 ON t2.iBrandID = t1.iBrandID WHERE t1.sProductURI = ? LIMIT 1";
    var query_2 = "SELECT * FROM product_images WHERE iProductID = ? ORDER BY iOrder ASC";
    var query_3 = "SELECT * FROM product_images_point WHERE iProductID = ?";
    var query_4 = "SELECT * FROM colors WHERE iMaterialID = ?";
    var query_5 = "SELECT * FROM product_images WHERE iPhotoInDescOnPage = 1 && iProductID = ? LIMIT 1";
    var query_6 = "SELECT t1.sProductURI, t1.sProductTitle, t2.sBrandTitle FROM product t1 LEFT JOIN brand t2 ON t2.iBrandID = t1.iBrandID";
    var query_7 = "SELECT t1.iProductID, t2.sColorCode, t2.sColorTitle, t2.sColorTitleCode, t2.sColorTitle, t2.sColorTextureFileName FROM product_color t1 LEFT JOIN colors t2 ON t2.iColorID = t1.iColorID WHERE t1.iProductID = ?";
    async.parallel([
       function(parallel_done) {
           connection.query(query_1, [ req.params.sProductURI ], function(err, product) {
               if (err) return parallel_done(err);
               data.product = product[0]
               data.title = data.product.sBrandTitle + " " + data.product.sProductTitle
               parallel_done()
           });
       }
    ], function(err) {
        if (err) console.log(err);
        async.parallel([
            function(parallel_done) {
                connection.query(query_2, [ data.product.iProductID ], function(err, product_images) {
                    if (err) return parallel_done(err)
                    data.product_images = product_images
                    parallel_done()
                });
            },
            function(parallel_done) {
                connection.query(query_3, [ data.product.iProductID ], function(err, product_images_point) {
                    if (err) return parallel_done(err)
                    data.product_images_point = product_images_point
                    parallel_done()
                });
            },
            function(parallel_done) {
                connection.query(query_4, [ data.product.iMaterialID ], function(err, colors) {
                    if (err) return parallel_done(err)
                    data.colors = colors
                    parallel_done()
                });
            },
            function(parallel_done) {
                connection.query(query_5, [ data.product.iProductID ], function(err, image_product_text) {
                    if (err) return parallel_done(err)
                    data.image_product_text = image_product_text[0]
                    parallel_done()
                });
            },
            function(parallel_done) {
                connection.query(query_6, [ data.product.iProductID ], function(err, products) {
                    if (err) return parallel_done(err)
                    data.products = products
                    parallel_done()
                });
            },
            function(parallel_done) {
                connection.query(query_7, [ data.product.iProductID ], function(err, product_color) {
                    if (err) return parallel_done(err)
                    data.product_color = product_color
                    parallel_done()
                });
            }
        ], function(err) {
            if (err) return parallel_done(err)
            connection.end()
            // res.send(data)
            res.render('product.pug', data)
        })
    });
})

app.get('/pay', (req, res) => {
    data.title = 'Оплата'
    res.render('pay.pug', data)
})

app.get('/palette', (req, res) => {
    data.title = 'Палитра'
    res.render('palette.pug', data)
})

app.get('/options', (req, res) => {
    data.title = 'Опции'
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
    res.render('wiki/catalog.pug', data)
})

app.get('/wiki/get', (req, res) => {
    res.render('wiki/catalog_list.pug', data)
})

app.get('/wiki/article', (req, res) => {
    data.title = 'Wiki article'
    res.render('wiki/article.pug', data)
})

app.get('/instruction', (req, res) => {
    data.title = 'Instruction'
    res.render('instruction/instruction.pug', data)
})

app.get('/instruction/video', (req, res) => {
    data.title = 'Instruction Video'
    res.render('instruction/video.pug', data)
})

app.get('/company', (req, res) => {
    data.title = 'О компании'
    res.render('company/company.pug', data)
})

app.get('/corporate', (req, res) => {
    data.title = 'Corporate'
    res.render('corporate/corporate.pug', data)
})



app.get('/regulation_window', (req, res) => {
    data.title = 'Регулировка окон'
    res.render('regulation_window/regulation_window.pug', data)
})

app.get('/optional_service', (req, res) => {
    data.title = 'Дополнительные услуги'
    res.render('optional_service/optional_service.pug', data)
})

app.get('/intuitive', (req, res) => {
    data.title = 'Интуйтивный подбор окон'
    res.render('intuitive/intuitive.pug', data)
})








http.listen(process.env.PORT, () => {
    console.log('Server is running...')
})