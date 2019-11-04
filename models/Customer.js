const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const cutomerSchema = new Schema({
    name: {
        type:String,
        trim: true
    },
    last_name: {
        type:String,
        trim: true
    },
    company: {
        type:String,
        trim: true
    },
    email: {
        type:String,
        trim: true,
        unique:true,
        lowercase: true
    },
    phone:{
        type:String,
        trim: true
    }
});

module.exports = mongoose.model('Customer',cutomerSchema);