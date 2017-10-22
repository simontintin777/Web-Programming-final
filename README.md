
# Shopping Website

Implement the basic function of shopping website, including register, Log in/out, purchase, cart, checkout and so on.

# Code Structure
The primary directories are:

- config: MongoDB connectors.
- data: Data modules for products and customers, including backend API functionality.
- node_modules: Required node modules.
- public: CSS, JS, and images.
- routes: Cart, checkout, customers, and products route definitions.
- views: Handlebars templates and HTML to manage the layout.
- seed: Seed script used to products database.


# Install packages

```
npm install
```

# Seeding the database

To drop the current database and populate the user and products collection with
several users and products, execute:

```
node seed.js
```

Seed the data. Adding products information into database.

# Starting the application

The application can be run by executing:

```
npm start
```

Open the browser, enter the url: http://localhost:3000

# Register and Logging in

You can sign up with email, first name, last name, phoneNumb, address, city, 
state and zipCode. After you creat a account you can use it to log in.


# Purchase

On the website, you can buy something, reduce or add something in shoppig cart, 
finally you can check out to pay the items.


