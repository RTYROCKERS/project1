const mongoose = require('mongoose');
const { Schema } = mongoose;


const orderSchema = new Schema({
  url: { type: String, required: true }, // URL for the image
  owner: { type: Schema.Types.ObjectId, ref: 'users', required: true }, 
  buyer: { type: Schema.Types.ObjectId, ref: 'users' }, 
  name: { type: String, required: true }, 
  price: { type: Number, required: true }, 
  preferredDate: {type: Date},
  preferredTime: {type: String},
}, {
  timestamps: true, 
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
