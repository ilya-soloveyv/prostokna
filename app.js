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

http.listen(process.env.PORT)