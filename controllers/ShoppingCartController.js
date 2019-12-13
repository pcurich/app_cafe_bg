const ShoppingCart = require('../models/ShoppingCart');
const ConfigStore = require('../models/ConfigStore');
const mongoose = require('mongoose');
const fs = require('fs');

//Add New ShoppingCart
exports.New = async(req, res,next) => {

  const config = await ConfigStore.findOne({storeNumber:"10436173721"}); 

  const shoppingCart = new ShoppingCart();
  let json = req.body;

  if(json.customer !== ''){
    shoppingCart.customer  = new mongoose.Types.ObjectId(json.customer);
  }
  shoppingCart.ticketNumber = config.lastTicket; 
  shoppingCart.cash = json.cash;
  shoppingCart.credit = json.credit;
  shoppingCart.change = json.change;
  shoppingCart.paymentType = json.paymentType;
  shoppingCart.total = json.total;

  shoppingCart.user  = new mongoose.Types.ObjectId(json.user);
  let nd = new Date();
  shoppingCart.date = new Date(Date.UTC(nd.getFullYear(),nd.getMonth(),nd.getDate(),nd.getHours(),nd.getMinutes(),nd.getSeconds()));
  shoppingCart.year   = nd.getFullYear();
  shoppingCart.month  = nd.getMonth()+1;
  shoppingCart.day    = nd.getDate();
  shoppingCart.hour   = nd.getHours();
  shoppingCart.minute = nd.getMinutes();
  shoppingCart.second = nd.getSeconds();

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
      setTicketNumber("10436173721");
      const shoppingCartJson = await ShoppingCart.findById(shoppingCart._id)
      .populate({
        path :'customer',
        model: 'Customer'
      })
      .populate({
        path :'user',
        model: 'User'
      })
      .populate({
        path:'details.product',
        model:'Product'
      });
      // json to xml
      var shoppingCartJson2 =  JSON.stringify(shoppingCartJson) ;
      storeData(shoppingCartJson2,"c:/print/queve/"+shoppingCart.ticketNumber+".json");

      res.json({message: 'Se guardo la venta correctamente',cart:json.id});
  } catch (error) {
      //console log, and next
      console.log(error);
      res.send(error);
      next();
  }
}

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, (data));
  } catch (err) {
    console.error(err);
  }
};

const getTicketNumber = async(storeNumber) => {
  try {
    
    return config.lastTicket * 1;
  } catch (error) {
    return -1;
  }
};

const setTicketNumber = async (storeNumber) =>{
  try {
    const shoppingCart = await ConfigStore.findOne({storeNumber:storeNumber})
    shoppingCart.lastTicket = shoppingCart.lastTicket + 1;
    shoppingCart.save();
  } catch (error) {
    return -1;
  }
};

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
    const {user} = req.params;
    const {year,month,day} = req.body;
    
    var userId = new mongoose.Types.ObjectId(user);
    console.log(typeof(userId));

    var shoppingCarts = await ShoppingCart.find(
      {$and:[
        {"year": year},
        {"month": month},
        {"day": day},
        {"user":userId}
      ]},{
        "_id": 1,"details":1,"paymentType": 1, "cash":1, "credit":1, "change":1, "total":1, "date":1,
        "customer":1,"details":1
      }
    )
    .populate('customer')
    .populate({
      path:'details.product',
      model:'Product'
    });
    res.json(shoppingCarts); 

  } catch (error) {

  }
}