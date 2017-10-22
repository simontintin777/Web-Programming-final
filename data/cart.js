module.exports=function Cart(oldCart){
    this.items=oldCart.items || {};
    this.totalQty=oldCart.totalQty || 0;
    this.totalPrice=oldCart.totalPrice || 0;

    this.add=function(item, id){
        var tempId = "xixi";
        for (var i = 0; i < 5; ++i) {
            tempId += id[i];
        }
        
        var storedItem=this.items[tempId];
        
        if(!storedItem){
            storedItem=this.items[tempId]={item: item, qty:0, price:0}
        }
        storedItem.qty++;
        storedItem.price=storedItem.item.price*storedItem.qty;
        this.totalQty++;
        this.totalPrice+=storedItem.item.price; 
    };

    this.generateArray=function(){
        var arr=[];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };

    this.reduceByOne = function(id) {
        var tempId = "xixi";
        for (var i = 0; i < 5; ++i) {
            tempId += id[i];
        }
        console.log(this.items[tempId]);
        this.items[tempId].qty--;
        this.items[tempId].price -= this.items[tempId].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[tempId].item.price;

        if (this.items[tempId].qty <= 0) {
            delete this.items[tempId];
        }
    };

    this.removeItem = function(id) {
        var tempId = "xixi";
        for (var i = 0; i < 5; ++i) {
            tempId += id[i];
        }
        this.totalQty -= this.items[tempId].qty;
        this.totalPrice -= this.items[tempId].price;
        delete this.items[tempId];
    };
  
};