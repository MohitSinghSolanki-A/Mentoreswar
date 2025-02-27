const express = require('express');
const {
    getProducts,
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController.js');

const router = express.Router();

router.get('/', getProducts);
router.post('/', addProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
module.exports = router;
