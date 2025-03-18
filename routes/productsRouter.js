const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.post("/create", upload.single("product_image"), async (req, res) => {
    try {
        let {
            product_name,
            product_price,
            discount_price,
            product_image,
            bg_color,
            panel_color,
            text_color,
        } = req.body;

        let product = await productModel.create({
            image: req.file.buffer,
            name: product_name,
            price: product_price,
            discount: discount_price,
            bgcolor: bg_color,
            panelcolor: panel_color,
            textcolor: text_color,
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred while creating the product." });
    }
});

module.exports = router;
