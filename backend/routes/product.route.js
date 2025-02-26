import express from 'express';
const router = express.Router();



router.get('/', (req, res) => {
    res.send('Hello, World!');
});



router.post('/products', async (req, res, next) => {
    const product = req.body; // user will send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Create product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

router.delete('/products/:id', async (req, res, next) => {
    const { id } = req.params;
    console.log('id', id);

    try {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, data: product });
    } catch (error) {
        console.error("Error in Delete product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}); // 🔥 Missing closing parenthesis fixed here!

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from the database

        if (products.length === 0) {
            return res.status(404).json({ success: false, message: "No products found" });
        }

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, image } = req.body;

    // Check if at least one field is provided
    if (!name && !price && !image) {
        return res.status(400).json({ success: false, message: "At least one field is required to update" });
    }

    try {
        // Find the product by ID and update it
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, image },
            { new: true, runValidators: true } // Return updated document & run schema validators
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

router.patch('/products/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    // Check if the request body is empty
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ success: false, message: "No fields to update" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: updates }, // Updates only specified fields
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


export default router

