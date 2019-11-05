const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
    name: {
        type: String, 
        unique: true,
        lowercase: true,
        trim : true, 
        required: [true, 'Agregue un identificador al permiso']
    }, 
    code: {
        type: String, 
        required: [true, 'Ingrese un código que identifique al permiso'],
        unique: true
    }
});

module.exports = mongoose.model('Permissions', permissionSchema);