import express from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
    patchProduct
} from '../controllers/product.controller.js';

const router = express.Router();

// Basic route
router.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Product routes
router.get('/products', getAllProducts);         // Get all products
router.get('/products/:id', getProductById);     // Get single product by ID (optional but recommended)
router.post('/products', createProduct);         // Create a new product
router.delete('/products/:id', deleteProduct);   // Delete a product
router.put('/products/:id', updateProduct);      // Full update
router.patch('/products/:id', patchProduct);     // Partial update

export default router;
