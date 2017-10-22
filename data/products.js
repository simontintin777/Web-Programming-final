const data = require("../data");
const mongoCollections = require("../config/mongoCollections");
const products = mongoCollections.products;
const uuid = require('node-uuid');


let exportedMethods = {
    test() {
        console.log("hello")
    },

    getProductById(id) {
        return products().then((productsCollection) => {
                return productsCollection.findOne({ _id: id }).then((product) => {
                    if (!product) throw "Product  not found";
        return product;
    });
    });
    },

    getProductBySeller(sellername) {
        return products().then((productsCollection) => {
                return productsCollection.findOne({ creator: {name:sellername} }).then((product) => {
                    if (!product) throw "Product not found";
        return product;
    });
    });
    },

    getSellerOfProduct(id) {
        return products().then((productsCollection) => {
                return productsCollection.findOne({ _id: id },{ creator:{name:1} }).then((productSeller) => {
                    if (!productSeller) throw "Product Seller not found";
        return productSeller;
    });
    });
    },

    getAllProducts() {
        return products().then((productsCollection) => {
            return productsCollection.find({}).toArray();
        });
    },

    /*
        parameters: Sellerid of currently logged in Seller.
        return: products which are not uploaded by current Seller, to display on browse products.
     */
    getAllProductsOtherSeller(sellerId) {
        return products().then((productsCollection) => {
            return productsCollection.find({seller: {$ne: sellerId}}).limit(2).toArray();
        });
    },

    /*
     Parameters: Seller id
     return: list of products of the Seller provided.
     */
    getAllSellerProducts(sellerid) {
        return products().then((productsCollection) => {
            return productsCollection.find({seller:sellerid}).toArray().then((allSellerProducts)=>{
                if (!allSellerProducts) Promise.reject("Seller Products not found");
                return allSellerProducts;
            });

        });
    },

    /*
     Parameters: searchText
     return: list of products found based on the search text provided.
     */
    getProductsBasedOnSearch(searchText) {
        return products().then((productsCollection) => {//$text: { $search: searchText }
            return productsCollection.find( {$text: { $search: searchText }} ).toArray().then((allUserProducts)=>{
                if (!allUserProducts) Promise.reject("User Products not found");
                return allUserProducts;
            }).catch((e) => {
                console.log("Error while searching for products:", e);
            });
        });
    },

    addProduct(requestBody) {
        return products().then((productsCollection) => {
                let newProduct = {
                    _id: uuid.v4(),
                    title: requestBody.title,
                    description: requestBody.description,
                    price:requestBody.price,
                    quantity: requestBody.quantity,
                    tag: requestBody.tag,
                    productImage: requestBody.URL,
                    comments:[],
                };
        return productsCollection.insertOne(newProduct).then((newProductInformation) => {
                return newProductInformation.insertedId;
    }).then((newId) => {
        return this.getProductById(newId);
    });
    }).catch((e) => {
        console.log("Error while adding product:", e);
        });
    },

    addComToPro(proId, upPoster, upComments) {
        let commentId = uuid();
        return products().then((proCollection) => {
            proCollection.updateOne(
            {_id: proId},
            {
                $addToSet: {
                    comments: {
                        _id: commentId,
                        poster: upPoster,
                        comment: upComments
                    }
                }
            })
            }).then(() => {
                    return this.getProductById(proId);
            }).catch((err) => {
            return Promise.reject(err);
        });
    },
    
    removeProduct(id) {
        return products().then((productsCollection) => {
                return productsCollection
                .removeOne({ _id: id })
                .then((deletionInfo) => {
                    if (deletionInfo.deletedCount === 0) {
                        throw (`Could not delete product with id of ${id}`)
                } else {}
            });
        }).catch((err)=>{
                console.log("Error while removing product:", err);
        });
    },

    /*
     Parameters: id, updatedProduct
     return: updated product.    
    */
    updateProduct(id, updatedProduct) {
        if (!id || !updatedProduct || id == undefined || updatedProduct == undefined)
        {
            return Promise.reject("Please valid input for your product.\n");
        }

        return products().then((productsCollection) => {
                let updatedProdcutData = {};


        if (updatedProduct.title) {
            updatedProdcutData.title = updatedProduct.title;
        }

        if (updatedProduct.description) {
            updatedProdcutData.description = updatedProduct.description;
        }

        if (updatedProduct.price) {
                    updatedProdcutData.price = updatedProduct.price;
        }

        if (updatedProduct.quantity) {
            updatedProdcutData.quantity = updatedProduct.quantity;
        }

        if (updatedProduct.tag) {
            updatedProdcutData.tag = updatedProduct.tag;
        }

        if (updatedProduct.image) {
            updatedProdcutData.productImage = updatedProduct.image;
        }

        if (updatedProduct.creator) {
            updatedProdcutData.creator = updatedProduct.creator;
        }

        let updateCommand = {
            $set: updatedProdcutData
        };
        return productsCollection.updateOne({ _id: id }, updateCommand).then(() => {
                return this.getProductByID(id);
    }).catch((err)=>{
        console.log("Error while updating product:", err);
        });
    });
    }

}

module.exports = exportedMethods;