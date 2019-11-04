const Customer = require('../models/Customer');

//Add New Customer

exports.New = async(req, res,next) => {
    const customer = new Customer(req.body);

    try {
        //save record
        await customer.save();
        res.json({message: 'Se agrego un nuevo cliente'})
    } catch (error) {
        //console log, and next
        res.send(error);
        next();
    }
}

//Show All Customers
exports.List = async(req, res,next) => {
    try {
        //save record
        const customers = await Customer.find({});
        res.json(customers);
    } catch (error) {
        //console log, and next
        console.log(error);
        next();
    }
}

//Show Customers by Id
exports.FindById = async(req, res,next) => {
    var customer = await Customer.findById(req.params.id)

    if(!customer){
        res.json({message: "Este cliente no existe"});
        next();
    }

    res.json(customer);

}

//Update Customers by Id
exports.Update = async(req, res,next) => {
    try {
        var customer = await Customer.findOneAndUpdate( {_id : req.params.id}, req.body, {new: true} );
        res.json(customer);
    } catch (error) {
        res.send(error);
        next();
    }
}

//delete customer by Id
exports.Delete = async(req, res,next) => {
    try {
        await Customer.findOneAndDelete( {_id : req.params.id} );
        res.json( { message: "Cliente Eliminado"});
    } catch (error) {
        res.send(error);
        next();
    }
}