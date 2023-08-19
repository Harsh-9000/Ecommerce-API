const express = require('express');
const Category = require('../models/category');
const router = express.Router();

router.get('/', async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        res.status(500).json({ success: false })
    }

    res.send(categoryList);
});

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(500).json({ message: 'The category with the given ID does not exist.' });
    }

    res.status(200).send(category);
});

router.post('/', async (req, res) => {
    let category = new Category({
        title: req.body.title,
    });

    category = await category.save();

    if (!category) {
        return res.status(404).send('Category was not created.');
    }

    res.send(category);
});

module.exports = router;