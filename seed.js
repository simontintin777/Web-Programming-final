const data = require("./data");
const productData = data.products;
const customerData = data.customers;


var product1 = {
    title: 'Suit',
    price: 150,
	URL: 'http://www.rd.com/wp-content/uploads/sites/2/2016/03/01-10-unexpected-ways-clothes-affect-mood-power-tie.jpg'
}

var product2 = {
    title: 'Book',
    price: 125,
	URL: 'https://i.warosu.org/data/lit/img/0053/10/1408414556289.png'
}

var product3 = {
    title: 'Toy',
    price: 50,
	URL: 'https://images-na.ssl-images-amazon.com/images/I/81ymGAf0wsL._SL1500_.jpg'
}

var product4 = {
    title: 'Chair',
    price: 200,
	URL: 'https://images.crateandbarrel.com/is/image/Crate/GraysonChairCobalt3QS14/$web_zoom_furn_av$/140221094500/grayson-chair.jpg'
}

var product5 = {
    title: 'Shoes',
    price: 125,
	URL: 'https://static.pexels.com/photos/19090/pexels-photo.jpg'
}

var product6 = {
    title: 'Ramen',
    price: 5,
	URL: 'https://budgetbytes.com/wp-content/uploads/2016/05/Ramen-Noodles.jpg'
}




productData.addProduct(product1).then((info) => {
    console.log(info)
});

productData.addProduct(product2).then((info) => {
    console.log(info)
});
productData.addProduct(product3).then((info) => {
    console.log(info)
});

productData.addProduct(product4).then((info) => {
    console.log(info)
});
productData.addProduct(product5).then((info) => {
    console.log(info)
});

productData.addProduct(product6).then((info) => {
    console.log(info)
});