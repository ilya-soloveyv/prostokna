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


app.use(function (req, res, next) {
    var cookie = req.cookies.cookieName;
    if (cookie === undefined) {
        var randomNumber = Math.random().toString()
        randomNumber = randomNumber.substring(2,randomNumber.length)
        res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true })
    } else {
        console.log('cookie exists', cookie)
    }
    next()
});

app.get('/', (req, res) => {
    res.render('index.pug', { title: 'Просто окна' })
})
app.get('/calc_data', (req, res) => {
    fs.readFile('./public/calc_data.json', 'utf8', function (err, data) {
        if (err) throw err
        res.json(JSON.parse(data))
    })    
})
app.get('/contact', (req, res) => {
    res.render('contact.pug', { title: 'Контакты' })
})
app.get('/gager', (req, res) => {
    res.render('gager.pug', { title: 'Замерщик' })
})

app.get('/product', (req, res) => {
    let connection = mysql.createConnection(config.get('db'))
    let query = "SELECT * FROM product t1 LEFT JOIN brand t2 ON t2.iBrandID = t1.iBrandID";
    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.log('Error query: ' + err)
            res.sendStatus(500)
            return
        }
        let products = rows;
        res.render('product/products.pug', { products: products })
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
    var query_7 = "SELECT t1.iProductID, t2.sColorCode, t2.sColorTitle, t2.sColorTitleCode FROM product_color t1 LEFT JOIN colors t2 ON t2.iColorID = t1.iColorID WHERE t1.iProductID = ?";
    var data = {};
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
    res.render('pay.pug', { title: 'Оплата' })
})
app.get('/palette', (req, res) => {
    res.render('palette.pug', { title: 'Palette' })
})
app.get('/options', (req, res) => {
    res.render('options.pug', { title: 'Options' })
})

var catalog = []
var catalog_item = {
    title: "Особые стекла для пластиковых окон ПВХ",
    desc: "Стеклопакет – важнейший элемент ПВХ окна. От его качества зависят ведущие свойства окна из пластика в целом – шумоизоляция, параметры сохранения тепла в жилище и даже безопасность проживающих в помещении. Чтобы пластиковые окна ПВХ"
}
for (let index = 0; index < 10; index++) {
    catalog.push(catalog_item);
}
app.get('/wiki', (req, res) => {
    res.render('wiki/catalog.pug', { title: 'Wiki', catalog: catalog })
})
app.get('/wiki/get', (req, res) => {
    res.render('wiki/catalog_list.pug', { catalog: catalog })
})
app.get('/wiki/article', (req, res) => {
    res.render('wiki/article.pug', { title: 'Wiki article' })
})
app.get('/instruction', (req, res) => {
    res.render('instruction/instruction.pug', { title: 'Instruction' })
})
app.get('/instruction/video', (req, res) => {
    res.render('instruction/video.pug', { title: 'Instruction Video' })
})
app.get('/company', (req, res) => {
    res.render('company/company.pug', { title: 'О компании' })
})
app.get('/corporate', (req, res) => {
    res.render('corporate/corporate.pug', { title: 'Corporate' })
})



app.get('/regulation_window', (req, res) => {
    res.render('regulation_window/regulation_window.pug', { title: 'Регулировка окон' })
})
app.get('/optional_service', (req, res) => {
    res.render('optional_service/optional_service.pug', { title: 'Дополнительные услуги' })
})
app.get('/intuitive', (req, res) => {
    res.render('intuitive/intuitive.pug', { title: 'Интуйтивный подбор окон' })
})








http.listen(process.env.PORT, () => {
    console.log('Server is running...')
})