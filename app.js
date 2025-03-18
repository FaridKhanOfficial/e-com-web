// Express Setup
const express = require('express');
const app = express();
require('dotenv').config();
const isLoggedIn = require('./middlewares/isLoggedIn')
// Cookies Setup
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require("express-session");
const flash = require("connect-flash");


// Database Setup
const db = require('./config/mongoose-connection');
// Setup session middleware
app.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // Set true if using HTTPS
    })
  );
  
  // Initialize flash
  app.use(flash());

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes Setup
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const ownersRouter = require('./routes/ownersRouter');
const index = require('./routes/index');

app.use('/', index);
app.use('/', usersRouter);
app.use('/products', productsRouter);
app.use('/owners', ownersRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});