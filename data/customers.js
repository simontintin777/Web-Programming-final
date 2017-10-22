const bcrypt = require("bcrypt");
const mongoCollections = require("../config/mongoCollections");
const customers = mongoCollections.customers;
const uuid = require('node-uuid');

let exportMethods = {
    test() {
        console.log("hello");
    },

    getUserByEmail (username, callback) {
        var query = {email: username};
        return customers().then((custCollection) => {
            custCollection.findOne(query, callback);
        });
        
    },

    comparePassword (candidatePassword, hash, callback) {
        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if (err) throw err;
            callback(null, isMatch);
        });
    },

    getUserById(id) {
        return customers().then((custCollection) => {
            return custCollection.findOne({_id: id }).then((customers) => {
                if (!customers) throw "Customer not found";
                return customers;
            });
        });
    },

    addUser(requestBody){
        var question;
        if(requestBody.securityQue == 2) {
            question = "Which is your favourite city?";
        }
        if(requestBody.securityQue == 1) {
            question = "What is your favourite colour?";
        }
        return customers().then((custCollection) => {
            let id = uuid();
            let newCustomers = {
                _id: id,
                email: requestBody.email,
                password: bcrypt.hashSync(requestBody.password, 10),
                // name: requestBody.name,
                firstName: requestBody.firstName,
                lastName: requestBody.lastName,
                gender: requestBody.gender,
                phoneNumb: requestBody.phoneNumb,
                address: requestBody.address,
                city: requestBody.city,
                state: requestBody.state,
                zipCode: requestBody.zipCode
            };
            console.log("aaa");
            console.log(newCustomers);
            console.log("aaa");
            return custCollection.findOne({ email: requestBody.email }).then((customers) => {
                if (customers) throw "Email already exists.";
                else {
                    return custCollection.insertOne(newCustomers);
                }
            });
        }).catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });
    },


    addOrderToUser(user, order) {
        return customers().then((custCollection) => {
            custCollection.updateOne(
            {_id: user.id},
            {
                $addToSet: {
                    order: {
                        order
                    }
                }
            })
            }).then(() => {
                    return this.getUserById(user.id);
            }).catch((err) => {
            return Promise.reject(err);
        });
    },

    findOrder(user){
            return customers.find({ user: user });
    },
    
    addCartToUser(userId, proId) {
        return customers().then((custCollection) => {
            custCollection.updateOne(
            {_id: userId},
            {
                $addToSet: {
                    cart: {
                        _id: proId
                    }
                }
            })
            }).then(() => {
                    return this.getUserById(userId);
            }).catch((err) => {
            return Promise.reject(err);
        });
    },
    
    updateUserDetails(requestBody) {
        return customers().then((custCollection) => {
            let updateUser = {
                password: bcrypt.hashSync(requestBody.password),
                name: requestBody.name,
                firstName: requestBody.firstName,
                lastName: requestBody.lastName,
                gender: requestBody.gender,
                phoneNumber: requestBody.phoneNumber,
                address: requestBody.address,
                city: requestBody.city,
                state: requestBody.state,
                zipCode: requestBody.zipCode,
                security: requestBody.security,
                answer: requestBody.answer,
                order: [],
                cart: []
            }
            let update = {
                $set: updateUser
            };
            return custCollection.updateOne({ email: requestBody.email }, update).then(() => {
                return this.getUserByEmail(requestBody.email);
            });
        });
    },
    
    
    getUserByEmailPassport(email, cb) {
        return customers().then((custCollection) => {
            return custCollection.findOne({ email: email }).then((customers) => {
                if (!customers) return cb(null, null);
                return cb(null, customers);
            });
        });
    },


    getUserByIDPassport(id, cb) {
        return customers().then((custCollection) => {
            return custCollection.findOne({ _id: id }).then((customers) => {
                if (!customers) cb(new Error('customers ' + id + ' does not exist'));
                return cb(null, customers);
            });
        });
    },
    
    addUserPic(requestBody) {
        return customers().then((custCollection) => {
            let updateCust = {
                imagePath: requestBody.image
            }
            let updateCommand = {
                $set: updateCust
            }
            return custCollection.updateOne({ _id: requestBody.userid },updateCommand).then(() => {
                return this.getUserByID(requestBody.userid);
            });
        });
    }
    
}

module.exports = exportMethods;