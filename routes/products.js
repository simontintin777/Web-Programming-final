var express = require('express');
var router = express.Router();
const data = require("../data");
const productData = data.products;


router.get('/allproducts', function(req, res, next) {
        productData.getAllProducts().then((pro) => {
            var productChunks=[];
            var chunkSize=3;
            for(var i=0; i<pro.length; i+=chunkSize){
                productChunks.push(pro.slice(i, i+chunkSize));
            }
            res.render('shop/products', { title: 'Cart', products: productChunks});
        });
    });

//List product by id
router.get('/:id', function(req, res) {
    productData.getProductById(req.params.id).then((product) => {
        res.json(product);
    }).catch(() => {
        res.status(404).json({ error: "product not found" });
    });
});


module.exports = router;