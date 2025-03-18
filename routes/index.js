const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const { registerUser, loginUser } = require('../controllers/authController');
const userModel = require('../models/user-model');
const upload = require("../config/multer-config");



    router.get('/', (req, res) => {
        res.render('index', {isLoggedIn: false});
    });

    router.post('/register', registerUser);
    router.post('/login', loginUser);

    router.get('/shop', isLoggedIn, async(req, res)=>{
    const products = await productModel.find();
  
  res.render('shop', {products});
})

router.get('/cart', isLoggedIn, async(req, res)=>{
    const products = await productModel.find();
  
  res.render('cart', {products});
})

router.get('/addtocart/:productid', isLoggedIn, async(req, res)=>{
  const user = await userModel.findOne({email: req.user.email});
  user.cart.push(req.params.productid);
  await user.save();
  res.redirect('/cart');
})

router.get('/logout', (req, res) => {
  res.clearCookie("token"); // Remove the 'token' cookie.
  res.redirect('/')
})

module.exports = router;
