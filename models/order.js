const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    date: { type: Date, default: Date.now },
    pickup_date: {type: Date},
});


// Export the model
module.exports = mongoose.model('Order', OrderSchema);