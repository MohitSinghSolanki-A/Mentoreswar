const express = require('express');
const {
    getProducts,
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController.js');

const router = express.Router();

router.get('/', getProducts);        // Get all products
router.post('/', addProduct);        // Add new product
router.get('/:id', getProductById);  // Get product by ID
router.put('/:id', updateProduct);   // Update a product
router.delete('/:id', deleteProduct); // Delete a product

module.exports = router;
