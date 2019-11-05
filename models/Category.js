const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name             : { type: String, trim:true },
    products         : { type: Number },
    photo            : { type: String },
    grouped_products : { type:Boolean, default: false},
    available        : { type:Boolean, default:true }
});
module.exports = mongoose.model('Category',categorySchema);