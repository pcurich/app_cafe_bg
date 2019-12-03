const ShoppingCart = require('../models/ShoppingCart');
const mongoose = require('mongoose');

//Add New ShoppingCart
exports.New = async(req, res,next) => {

  const shoppingCart = new ShoppingCart();
  let json = req.body;

  if(json.customer !== ''){
    shoppingCart.customer  = new mongoose.Types.ObjectId(json.customer);
  }
  shoppingCart.cash = json.cash;
  shoppingCart.credit = json.credit;
  shoppingCart.change = json.change;
  shoppingCart.paymentType = json.paymentType;
  shoppingCart.total = json.total;

  shoppingCart.user  = new mongoose.Types.ObjectId(json.user);
  shoppingCart.date = new Date();

  json.details.forEach( product => {
    shoppingCart.details.push(
      {
        product:new mongoose.Types.ObjectId(product.productId.trim()),
        quantity:product.quantity,
        price:product.price 
      }
    )
  });

  try {
      //save record
      await shoppingCart.save(); 
      res.json({message: 'Se guardo la venta correctamente',cart:json.id})
  } catch (error) {
      //console log, and next
      console.log(error);
      res.send(error);
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
    res.send(error);
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

exports.Search = async(req, res,next) => {
  try {
    const {date,user} = req.params;

    console.log(date);
    console.log(user);

    // var shoppingCart = await ShoppingCart.find(
    //   {"created_on": {
    //     "$gte": new Date(date.y, 7, 14), 
    //     "$lt": new Date(2012, 7, 15)}})
    //   .populate('customer')
    //   .populate({
    //     path:'details.product',
    //     model:'Product'
    //   });

  } catch (error) {
    
  }
}