const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name             : { type: String, trim:true },
    products         : { type: [String] },
    photo            : { type: String },
    photo            : { type: String },
    grouped_products : { type:Boolean, default: false},
    available        : { type:Boolean, default:true },
    deleted          : { type:Boolean, default:false }
});
module.exports = mongoose.model('Category',categorySchema);