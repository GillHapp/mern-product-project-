import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/products');
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const response = await fetch(`http://localhost:8080/products/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete product');
            setProducts((prev) => prev.filter((product) => product._id !== id));
            alert("Product deleted successfully!");
        } catch (err) {
            alert(err.message);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update/${id}`);
    };

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>All Products</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {products.map(({ _id, name, price, image }) => (
                    <div
                        key={_id}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            padding: '16px',
                            textAlign: 'center',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        }}
                    >
                        <img
                            src={image}
                            alt={name}
                            style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <h3 style={{ margin: '10px 0', fontSize: '18px' }}>{name}</h3>
                        <p style={{ fontWeight: 'bold', color: '#2d3748' }}>Price: ₹{price}</p>

                        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            <button
                                style={{ padding: '6px 12px', backgroundColor: '#f56565', color: 'white', borderRadius: '6px', cursor: 'pointer' }}
                                onClick={() => handleDelete(_id)}
                            >
                                Delete
                            </button>
                            <button
                                style={{ padding: '6px 12px', backgroundColor: '#48bb78', color: 'white', borderRadius: '6px', cursor: 'pointer' }}
                                onClick={() => handleUpdate(_id)}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
