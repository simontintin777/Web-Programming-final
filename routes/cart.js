var express = require('express');
var router = express.Router();
var Cart = require("../data/cart");
//const Cart = data.cart;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const data = require("../data");
const customerData = data.customers;
const productData = data.products;


router.get('/add-to-cart/:id', function(req, res, next){
  var productId=req.params.id; 
  var cart=new Cart(req.session.cart ? req.session.cart : {});

    console.log("productId = ");
    console.log(productId);
    
  productData.getProductById(productId).then((product) =>{
   console.log(product);
    cart.add(product, product._id);
    req.session.cart=cart;
    console.log(req.session.cart);
    res.redirect('/products/allproducts');
  })
});

router.get('/reduce/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  console.log(productId);
  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/cart/shopping-cart');
});

router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/cart/shopping-cart');
});

router.get('/shopping-cart', function(req, res, next){
  if(!req.session.cart){
    return res.render('shop/shopping-cart', {products: null});
  }
  var cart =new Cart(req.session.cart);
  console.log("====");
  console.log(cart.generateArray());
  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
});
module.exports = router;