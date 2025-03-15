// Express Setup
const express = require('express');
const app = express();
require('dotenv').config();
const isLoggedIn = require('./middlewares/isLoggedIn')
// Cookies Setup
const cookieParser = require('cookie-parser');
const path = require('path');

// Database Setup
const db = require('./config/mongoose-connection');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes Setup
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const ownersRouter = require('./routes/ownersRouter');
app.use('/', usersRouter);
app.use('/products', productsRouter);
app.use('/owners', ownersRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});