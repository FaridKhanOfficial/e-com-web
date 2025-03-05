// Express Setup
const express = require('express');
const app = express();

// Cookies Setup
const cookieParser = require('cookie-parser');
const path = require('path');

// Database Setup
const db = require('./config/mongoose-connection');

// Routes Setup
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const ownersRouter = require('./routes/ownersRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/owners', ownersRouter);

app.get('/', (req, res) => {
    res.send('Hi Buddy');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});