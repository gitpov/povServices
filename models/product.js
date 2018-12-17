const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    image: {type: String},
    ingredients: [{
        ingredient: [{
            description: {type: String},
            poids: {type: Number}
        }]
    }]
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);