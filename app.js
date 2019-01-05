// Dependencies
const express = require('express');
const app = express();
const Joi = require('joi');
const booksRoutes = require('./routes/books');
const usersRoutes = require('./routes/users');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000

//  Starting MongoDB connection
mongoose.connect('mongodb://muklah:12345m@ds141704.mlab.com:41704/bookstore', { useNewUrlParser: true });

//  To Check if the connection works fine or not
mongoose.connection.on('connected', () => {
    console.log('\x1b[36m%s\x1b[0m', 'mongo has been connected...');
});

// MiddleWare
app.use(express.json());
// For serving images and other static data
app.use(express.static('public'));

// Route MiddleWare for any route that start with (/api/books)
app.use('/api/books', booksRoutes);
app.use('/api/users', usersRoutes);

// Starting the server
app.listen(PORT, () => {
    console.log('Running on port 5000');
});
