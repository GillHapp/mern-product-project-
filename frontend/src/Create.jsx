import React, { useState } from 'react';

export default function Create() {
    const [product, setProduct] = useState({ name: '', price: '', image: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.name || !product.price || !product.image) {
            setMessage("⚠️ Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`✅ Product "${data.data.name}" created successfully!`);
                setProduct({ name: '', price: '', image: '' });
            } else {
                setMessage(`❌ ${data.message}`);
            }
        } catch (err) {
            setMessage(`❌ Error: ${err.message}`);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>➕ Create Product</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                    style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={product.image}
                    onChange={handleChange}
                    style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
                <button
                    type="submit"
                    style={{
                        padding: "10px",
                        backgroundColor: "#2196f3",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Create 🚀
                </button>
            </form>
            {message && <p style={{ marginTop: "15px", textAlign: "center" }}>{message}</p>}
        </div>
    );
}
