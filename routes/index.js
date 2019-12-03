const express = require('express');
const router = express.Router();

/**middle to portect the routes */
const auth = require('../middleware/auth')

const customersController = require('../controllers/CustomersController');
const productsController = require('../controllers/ProductsController');
const categoriesController = require('../controllers/CategoryController');
const shoppingCartController = require('../controllers/ShoppingCartController');
const UserController = require('../controllers/UserController');

const mediaController = require('../controllers/MediaController');
const dummyController = require('../controllers/DummyController');

module.exports = function(){

  /**Upload */
  router.post('/upload',auth, mediaController.Upload);

  /** CUSTOMERS */

  //Add new Customer POST
  router.post('/customers',auth, customersController.New);

  //Get all customers
  router.get('/customers',auth,customersController.List);

  //id customers
  router.get('/customers/:id',auth,customersController.FindById);
  router.post('/customers/search/:query',auth,customersController.Search);
  //Update
  router.put('/customers/:id',auth,customersController.Update);

  //Update
  router.delete('/customers/:id',auth,customersController.Delete);

  /** CATEGORIES */

  //Add new Category
  router.post('/categories',auth, categoriesController.New);

  //Get all categories
  router.get('/categories',auth,categoriesController.List);

  //id customers
  router.get('/categories/:id',categoriesController.FindById);

  //Update
  router.put('/categories/:id',categoriesController.Update);

  //Delete
  router.delete('/categories/:id',auth,categoriesController.Delete);

  /** PRODUCTS */

  //Add new Customer POST
  router.post('/products', auth,productsController.New);

  //Get all customers
  router.get('/products', auth,productsController.List);

  //id customers
  router.get('/products/:id',auth,productsController.FindById);

  //Update
  router.put('/products/:id',auth, productsController.Update);

  //Delete
  router.delete('/products/:id',productsController.Delete);

  //search
  router.post('/products/search/:query',auth,productsController.Search);

  //Product by Category
  router.get('/product-by-category/:idCategory',auth,productsController.GetProductByCategory);

  //Add Product to Category
  router.post('/product-by-category/:idCategory/:idProduct',auth,productsController.NewProductByCategory);

  //Remove Category from product
  router.put('/product-by-category/:idProduct',auth,productsController.DeleteCategory);

  /** SHOPPINGCART */

  //Add new shoppingCard POST
  router.post('/shoppingcart/new/:id',auth,shoppingCartController.New);

  //Get all shoppingCard
  router.get('/shoppingcart',shoppingCartController.List);

  //id shoppingCard
  router.get('/shoppingcart/:id',auth,shoppingCartController.FindById);

  //id shoppingCard
  router.put('/shoppingcart/:id',auth,shoppingCartController.Update);

    //id shoppingCard
  router.get('/shoppingcart/:date/:user',auth,shoppingCartController.Search);

  //Delete
  router.delete('/shoppingcart/:id',auth,shoppingCartController.Delete);

  /**USER */
  router.post('/create-account',UserController.Create)

  router.post('/login',UserController.Login)
  
  /**DUMMNY */
  router.post('/dummy',dummyController.New)

  return router;
}