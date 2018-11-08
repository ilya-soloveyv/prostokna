const express = require('express')
const app = express()
const http = require('http').createServer(app)
const pug = require('pug')
require('dotenv').config()

app.locals.env = process.env;

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index.pug', { title: 'Просто окна' })
})
app.get('/contact', (req, res) => {
    res.render('contact.pug', { title: 'Контакты' })
})
app.get('/gager', (req, res) => {
    res.render('gager.pug', { title: 'Замерщик' })
})
app.get('/product', (req, res) => {
    res.render('product.pug', { title: 'Каталог' })
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

http.listen(process.env.PORT, () => {
    console.log('Server is running...')
})