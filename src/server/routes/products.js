
import express from 'express';
import { getProducts, addProduct, getProductById } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', addProduct);
router.get('/:id', getProductById);

export default router;
