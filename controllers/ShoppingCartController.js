const ShoppingCart = require('../models/ShoppingCart');
const mongoose = require('mongoose');

//Add New ShoppingCart
exports.New = async(req, res,next) => {

    let json =  JSON.stringify(req.body);
    // console.log(json);
    const shoppingCart = new ShoppingCart();

    if(json.customer === ""){
      console.log("json.customer");
      console.log(json.customer)
      console.log(json.customer === "")

      shoppingCart.customer  = new mongoose.Types.ObjectId("000000000000000000000000");
    }else{
      shoppingCart.customer  = new mongoose.Types.ObjectId(json.customer);
    }

    shoppingCart.date = new Date();
    console.log(shoppingCart);

    try {
        //save record
        await shoppingCart.save();
        res.json({message: 'Se agrego la compra'})
    } catch (error) {
        //console log, and next
        console.log(error);
        next();
    }
}

//Show All ShoppingCart
exports.List = async(req, res,next) => {
  try {
      //save record
      const shoppingCart = await ShoppingCart.find({})
      .populate('customer')
      .populate({
        path:'details.product',
        model:'Product'
      });
      res.json(shoppingCart);
  } catch (error) {
      //console log, and next
      console.log(error);
      next();
  }
}

//Show ShoppingCart by Id
exports.FindById = async(req, res,next) => {
  var shoppingCart = await ShoppingCart.findById(req.params.id)
      .populate('customer')
      .populate({
        path:'details.product',
        model:'Product'
      });

  if(!shoppingCart){
      res.json({message: "Este pedido no existe"});
      next();
  }
  res.json(shoppingCart);
}

//Update Products by Id
exports.Update = async(req, res,next) => {
  try {
      let shoppingCart = await ShoppingCart.findOneAndUpdate({_id:req.params.id},req.body,{
        new:true
      })
      .populate('customer')
      .populate({
        path:'details.product',
        model:'Product'
      });

      res.json(shoppingCart);
  } catch (error) {
      console.log(error);
      next();
  }
}

//delete ShoppingCart by Id
exports.Delete = async(req, res,next) => {
  try {
      await ShoppingCart.findOneAndDelete( {_id : req.params.id} );
      res.json( { message: "Carrito Eliminado"});
  } catch (error) {
      console.log(error);
      next();
  }
}