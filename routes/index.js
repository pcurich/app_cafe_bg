const express = require('express');
const router = express.Router();

/**middle to portect the routes */
const auth = require('../middleware/auth')

const customersController = require('../controllers/CustomersController');
const productsController = require('../controllers/ProductsController');
const shoppingCartController = require('../controllers/ShoppingCartController');
const UserController = require('../controllers/UserController');

module.exports = function(){

  /** CUSTOMERS */

  //Add new Customer POST
  router.post('/customers',auth, customersController.New);

  //Get all customers
  router.get('/customers',auth,customersController.List);

  //id customers
  router.get('/customers/:id',auth,customersController.FindById);

  //Update
  router.put('/customers/:id',auth,customersController.Update);

  //Update
  router.delete('/customers/:id',auth,customersController.Delete);


  /** PRODUCTS */

  //Add new Customer POST
  router.post('/products', auth,productsController.Upload, productsController.New);

  //Get all customers
  router.get('/products',auth,productsController.List);

  //id customers
  router.get('/products/:id',auth,productsController.FindById);

  //Update
  router.put('/products/:id',auth,productsController.Upload,productsController.Update);

  //Delete
  router.delete('/products/:id',auth,productsController.Delete);

  //search
  router.post('/products/search/:query',auth,productsController.Search);

  /** SHOPPINGCART */

  //Add new shoppingCard POST
  router.post('/shoppingcart/new/:id',auth,shoppingCartController.New);

  //Get all shoppingCard
  router.get('/shoppingcart',auth,shoppingCartController.List);

  //id shoppingCard
  router.get('/shoppingcart/:id',auth,shoppingCartController.FindById);

  //id shoppingCard
  router.put('/shoppingcart/:id',auth,shoppingCartController.Update);

  //Delete
  router.delete('/shoppingcart/:id',auth,shoppingCartController.Delete);

  /**USER */
  router.post('/create-account',UserController.Create)

  router.post('/login',UserController.Login)

  return router;
}