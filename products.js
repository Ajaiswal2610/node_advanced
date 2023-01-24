const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    brand:String,
    Category:String
});

const product_model  = mongoose.model('products', productSchema)
module.exports = product_model;