const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const cutomerSchema = new Schema({
    name:       { type:String, trim: true},
    last_name:  { type:String, trim: true },
    company:    { type:String, trim: true},
    phone:      { type:String, trim: true },
    email: {
        type:String,
        trim: true,
        unique:true,
        lowercase: true
    },
    document_type:  { type:String },
    document_value: { type:String,trim: true },
    
    created_at: {type: Date, default: Date.now },
    last_purchase: {type: Date  }
    
});

module.exports = mongoose.model('Customer',cutomerSchema);