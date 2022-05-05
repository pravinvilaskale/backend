const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    productcode: {
        type: String,
        required: true
    },
    productname: {
        type: String
    },
    productprice: {
        type: Number
    },
    productweight: {
        type: Number
    }
})

mongoose.model('Bill', billSchema);
