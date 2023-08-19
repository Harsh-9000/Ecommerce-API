const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config'); 

// Routes
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');


// Database Connection
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((err) => {
        console.log(err);
    });


const app = express();
const api = process.env.API_URL;

// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use(`${api}/categories`, categoriesRouter);
// app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/products`, productsRouter);
// app.use(`${api}/users`, usersRouter);

// Server 
app.listen(3000, () => {
    console.log('Server Started');
});