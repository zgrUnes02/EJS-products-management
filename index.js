const express = require('express') ;
const session = require('express-session') ;
const dotenv = require('dotenv').config() ;
const PORT = process.env.PORT || 4001 ;
const mongoose = require('mongoose') ;
const app = express() ;
const EmitterEvent = require('node:events') ;
const router = require('./routes/routes.js');
const productModel = require('./models/products.js');
const emitter = new EmitterEvent() ;

//! middlewares :
app.use(express.json()) ;
app.use(express.urlencoded({extended:false})) ;
app.use(express.static(__dirname + '/public')) ;
app.set('view engine' , 'ejs') ;

//! Connect With The Database :
mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log('The Connection With Database Has Been Accepted With Success')
}).catch((error) => {
    console.log(error)
})

//! Event :
emitter.on('serverRunningWithSuccess' , ( port ) => {
    console.log(`The Server Is Running On localhost:${port}`) ;
}) ;

//! CRUD routes :
app.get('/products' , router);
app.post('/products' , router);
app.post('/products/update/:id' , router);
app.get('/products/:id' , router);
app.get('/update/:id' , router);

//! Pages routes :
app.get('/' , (req , res) => {
    res.render('home') ;
}) ;

app.get('/create' , (req , res) => {
    res.render('create') ;
}) ;

//! Run The Server :
app.listen(PORT , emitter.emit('serverRunningWithSuccess' , PORT)) ;
