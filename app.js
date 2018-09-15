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
app.get('/company', (req, res) => {
    res.render('company.pug', { title: 'О компании' })
})
app.get('/pay', (req, res) => {
    res.render('pay.pug', { title: 'Оплата' })
})

http.listen(process.env.PORT)