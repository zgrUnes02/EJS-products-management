
const express = require('express') ;
const router = express.Router() ;
const productModel = require('../models/products');

//* Get method ---------------------------------
router.get('/products' , async (req , res) => {
    try {
        const products = await productModel.find({}) ;
        res.render('products' , {products : products}) ; 
    }
    catch ( error ) {
        res.status(500).json(error) ;
    }
    
});

//* Post method --------------------------------
router.post('/products' , async (req , res) => {
    const { name , yearOfProduction , color , price , description } = req.body ;
    try {
        await productModel.create({
            name : name ,
            yearOfProduction : yearOfProduction ,
            color : color ,
            price : price ,
            description : description 
        }) ;
        res.redirect('/products') ;
    }
    catch ( error ) {
        res.status(500).json(error) ;
    }
});

//* Put method ---------------------------------
router.post('/products/update/:id' , async (req , res) => {
    const { name , yearOfProduction , color , price , description } = req.body ;
    const { id } = req.params ;
    try {
        await productModel.findByIdAndUpdate(id , {
            name : name , 
            yearOfProduction : yearOfProduction ,
            color : color ,
            price : price ,
            description : description
        }) ;
        res.redirect('/products');
    }
    catch ( error ) {
        res.status(500).json(error) ;
    }
});

//* Delete method ---------------------------------
router.get('/products/:id' , async (req , res) => {
    const { id } = req.params ;
    try {
        await productModel.findByIdAndDelete(id) ;
        res.redirect('/products') ;
    }
    catch ( error ) {
        res.status(500).json(error) ;
    }
});

//* New values method ---------------------------------
router.get('/update/:id' , async (req , res) => {
    const { id } = req.params ;
    try {
        const product = await productModel.findById(id) ;
        res.render('edit' , {product : product}) ;
    }
    catch ( error ) {
        res.status(500).json(error) ;
    }
})


module.exports = router ;