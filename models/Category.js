const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name             : { 
                        type: String, trim:true, 
                        required: [true, 'Necesita definir un nombre a la categoría'],
                        unique: true, 
                        minlength: [4, 'El nombre de la categoria debe ser mayor a 4 caracteres'],
                        maxlength: [40,'El nombre de la categoria no debe ser mayor a 40 caracteres']
                        },
    photo            : { type: String, default: 'default.png'},
    grouped_products : { type: Boolean, default: false},
    available        : { type: Boolean, default: true },
    deleted          : { type: Boolean, default: false }
});
module.exports = mongoose.model('Category',categorySchema);