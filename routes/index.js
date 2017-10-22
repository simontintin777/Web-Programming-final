var express = require('express');
var router = express.Router();
const customerRoutes = require("./customers");
const productRoutes = require("./products");
const cartRoutes = require("./cart");
const checkoutRoutes = require("./checkout");


const constructorMethod = (app) => {
    app.use("/customers", customerRoutes);
    app.use("/products", productRoutes);
    app.use("/cart", cartRoutes);
    app.use("/checkout", checkoutRoutes);
    app.use("/", (req, res) => {
        // res.sendStatus(404).json({error: "Not found! :("});
        //res.redirect('http://localhost:3000/products/allproducts');
       res.render('test/index');
    })
    
};

module.exports = constructorMethod;
