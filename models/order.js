const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    date: { type: Date, default: Date.now },
    pickup_date: {type: Date},
    orderLines: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {type: Number, required: true}
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    state: {type: String, required: true},

});


// Export the model
module.exports = mongoose.model('Order', OrderSchema);