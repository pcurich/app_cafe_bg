const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  category :  { type: Schema.ObjectId },
  name     :  { type: String, trim:true },
  price    :  { type:Number },
  photo    :  { type: String },
  available:  { type:Boolean, default:true }  
});

module.exports = mongoose.model('Product',productSchema);