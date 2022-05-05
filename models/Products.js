const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productcode: {
        type: String,
        unique: true,
        required: true
    },
    productname: {
        type: String
    },
    productprice: {
        type: String
    }
})

mongoose.model('Products', productSchema);
