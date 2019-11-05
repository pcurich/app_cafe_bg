const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String, 
        unique: true,
        lowercase: true,
        trim : true, 
        required: [true, 'Agregue un identificador al grupo']
    }, 
    code: {
        type: String, 
        required: [true, 'Ingrese un código que identifique al grupo'],
        unique: true
    },
    permissions: [String]
});

module.exports = mongoose.model('Groups', groupSchema);