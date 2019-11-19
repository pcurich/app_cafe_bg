const Product = require('../models/Product');
const multer = require('multer');
const shortid = require('shortid');
const mongoose = require('mongoose');

const configurationMulter = {
  storage: fileStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
      cb(null,__dirname+'../../uploads/');
    },
    filename:(req,file,cb)=>{
      const extension = file.mimetype.split('/')[1];
      cb(null,`${shortid.generate()}.${extension}`);
    }
  }),
  fileFilter(req,file,cb){
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      cb(null,true);
    }else{
      cb(new Error('Formato no valido'))
    }
  },
}

//pasar la configuracion y el campo
const upload = multer(configurationMulter).single('photo')

//UploadFile
exports.Upload = async(req, res,next) => {
  if(typeof req.file !== 'undefined')
  {
    upload(req,res,function(error){
      if(error){
        res.json({message:error})
      }
    })
  }
  next();
}

//Add New Product
exports.New = async(req, res,next) => {
    const product = new Product(req.body);
    product.delete = false;
    try {
      await product.save();
      res.json({message: 'Se agrego un nuevo producto'})
    } catch (error) {
      console.log(error);
      res.send(error);
    }
    next();
}

//Show All Products
exports.List = async(req, res,next) => {
    try {
        //save record
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        //console log, and next
        res.send(error);
        next();
    }
}

//Show Products by Id
exports.FindById = async(req, res,next) => {
    var product = await Product.findById(req.params.id)

    if(!product){
        res.json({message: "Este producto no existe"});
        next();
    }
    res.json(product);
}

//Update Products by Id
exports.Update = async(req, res,next) => {
    try {
        //construit un nuevo producto
        let newProduct = req.body;
        newProduct.delete = false;
        let oldProduct = await Product.findById(req.params.id);
        newProduct.category = oldProduct.category
        var product = await Product.findOneAndUpdate( {_id : req.params.id}, newProduct, {new: true} );
        res.json(product);
    } catch (error) {
        res.send(error);
        next();
    }
}

//delete Products by Id
exports.Delete = async(req, res,next) => {
    try {
        await Product.findOneAndDelete( {_id : req.params.id} );
        res.json( { message: "Producto Eliminado"});
    } catch (error) {
        res.send(error);
        next();
    }
}

//search Products by query
exports.Search = async(req, res,next) => {
  try {
      const {query} = req.params;
      const products = await Product.find( { name : new RegExp(query,'i')} );
      res.json(products);
  } catch (error) {
      res.send(error);
      next();
  }
}

exports.GetProductByCategory = async(req,res,next) => {
  try {
    const {idCategory} = req.params;
    var products = await Product.find({category: new mongoose.Types.ObjectId(idCategory)})
    res.json(products);
  } catch (error) {
    res.send(error)
  }
  next();
}

exports.NewProductByCategory = async(req,res,next) => {
  try {
    const {idCategory,idProduct} = req.params;
    const newProduct = await Product.findById(idProduct);
    newProduct.category = new mongoose.Types.ObjectId(idCategory);
    var product = await Product.findOneAndUpdate( {_id : idProduct}, newProduct, {new: true} );
    res.json(product);
  } catch (error) {
    res.send(error)
  }
  next();
}

exports.DeleteCategory = async(req,res,next) => {
  try {
    const {idProduct} = req.params;
    console.log(idProduct)
    const newProduct = await Product.findById(idProduct);
    newProduct.category = null;
    var product = await Product.findOneAndUpdate( {_id : idProduct}, newProduct, {new: true} );
    res.json(product);
  } catch (error) {
    res.send(error)
  }
  next();
}