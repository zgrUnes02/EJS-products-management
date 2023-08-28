
const mongoose = require('mongoose') ;

const schemaProduct = new mongoose.Schema({
    name : {
        type : String , 
        required : [true , 'The name field is required'] ,
    } ,

    yearOfProduction : {
        type : Number , 
        required : [true , 'The year of production field is required'] ,
    } ,

    color : {
        type : String , 
        required : [true , 'The color field is required'] ,
    } ,

    price : {
        type : Number , 
        required : [true , 'The price field is required'] ,
    } ,

    description : {
        type : String ,
        required : [true , 'The description field is required'] ,
    }
} , { timestamps : true }) ;

const productModel = mongoose.model('products' , schemaProduct) ; 
module.exports = productModel ;
