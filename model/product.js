const mongoose = require("mongoose")
const Schema = require("mongoose").Schema;

const product = new Schema({
    productName : String,
    productDescription:String,
    productPrice:Number,
    productImage:String,
    productCategory:String
})
 const Product =  mongoose.model('Product',product)
 module.exports =  Product