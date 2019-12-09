const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const ConfigStore = new Schema({
    storeName   : {type: String, trim:true},
    storeNumber : {type: String, trim:true},
    lote        : { type: Number},
    lastTicket  : { type: Number}
});
module.exports = mongoose.model('ConfigStore',ConfigStore);