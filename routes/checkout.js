var express = require('express');
var router = express.Router();
var Cart = require("../data/cart");
const data = require("../data");
const customerData = data.customers;

router.get('/checkout', isLoggedIn, function(req, res, next){
  if(!req.session.cart){
    return res.redirect('/shopping-cart');
  }
  var cart =new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
//  req.session.cart = null;
});

router.post('/checkout', isLoggedIn, function(req, res, next){
    if(!req.session.cart){
      return res.redirect('/shopping-cart');
    }
    var cart =new Cart(req.session.cart);
    req.flash('success_msg', 'Successfully bought product!');
    req.session.cart = null;
    res.redirect('/');
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/customers/login');
}


module.exports = router;