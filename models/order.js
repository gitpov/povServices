const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    date: { type: Date, default: Date.now },
    pickup_date: {type: Date},
    commandLine:     {
        productId: {type: ObjectId},
        quantity: {type: Number}
    },
    userId: {type: ObjectId}
});


// Export the model
module.exports = mongoose.model('Order', OrderSchema);