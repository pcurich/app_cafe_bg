const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const shoppingCart = new Schema({
  customer: {
    type: Schema.ObjectId,
    ref: 'Customer'
  },
  user:{
    type: Schema.ObjectId,
    ref: 'User'
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
  },
  date: {
    type:Date
  }
});

module.exports = mongoose.model('ShoppingCart',shoppingCart);