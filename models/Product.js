const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    trim:true
  },
  price :{
    type:Number
  },
  photo: {
    type: String
  }
});

module.exports = mongoose.model('Product',productSchema);