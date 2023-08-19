const express = require('express');
const Product = require('../models/product');
const Category = require('../models/category');
const router = express.Router();

router.get('/', async (req, res) => {
    let filter = {};

    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') };
    }

    const productList = await Product.find(filter).populate('category');

    if (!productList) {
        res.status(500).json({ success: false });
    }

    res.send(productList);
});

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');

    if (!product) {
        res.status(500).json({ success: false });
    }

    res.send(product);
});

router.post('/', async (req, res) => {
    const category = await Category.findById(req.body.category);

    if (!category) {
        return res.status(400).send('Invalid Category');
    }

    let product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        availability: req.body.availability,
        category: req.body.category,
    });

    product = await product.save();

    if (!product) {
        return res.status(500).send('The product was not created.');
    }

    res.send(product);
});

module.exports = router;