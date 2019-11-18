const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  category :  {
                type: Schema.ObjectId,
                ref: 'Category'
              },
  short_name: {
                type: String, trim:true,
                required: [true, 'Necesita definir un nombre al producto'],
                unique: true,
                minlength: [1, 'El nombre del producto debe ser mayor a 4 caracteres'],
                maxlength: [10,'El nombre del producto no debe ser mayor a 10 caracteres']
              },
  long_name:  {
                type: String, trim:true,
                required: [true, 'Necesita definir un nombre al peoducto'],
                unique: true,
                minlength: [4, 'El nombre del producto debe ser mayor a 4 caracteres'],
                maxlength: [32,'El nombre del producto no debe ser mayor a 32 caracteres']
              },
  description:{
                type: String, trim:true
              },
  type     : {
                type: String,
                enum: ['ToSell', 'Material']
              },
  price    :  { type:Number,
                min: [0, 'El valor minimo es 0'],
                max: [100, 'El valor máximo es 100']
              },
  cost     :  {
                type:Number,
                min: [0, 'El valor minimo es 0'],
                max: [100, 'El valor máximo es 100']
              },
  photo    :  { type: String, default: 'default.png'},
  available:  { type: Boolean, default:true },
  deleted   : { type: Boolean, default:false }
});

module.exports = mongoose.model('Product',productSchema);