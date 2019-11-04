const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const shoppingCart = new Schema({
  customer: {
    type: Schema.ObjectId,
    ref: 'Customer'
  },
  details : [{
    product : {
      type: Schema.ObjectId,
      ref: 'Product'
    },
    quantity: Number
  }],
  total: {
    type:Number
  }
});

module.exports = mongoose.model('ShoppingCart',shoppingCart);