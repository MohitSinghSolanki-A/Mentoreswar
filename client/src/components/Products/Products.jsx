import { useState, useEffect } from 'react';
import { useLocation } from "wouter";
import './Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(product => product.category === filter);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="products-container">
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('electronics')}>Electronics</button>
        <button onClick={() => setFilter('clothing')}>Clothing</button>
      </div>
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-card">
            <div className="product-image-container">
              <img src={product.imageUrl} alt={product.title} className="product-image" />
            </div>
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-footer">
              <span className="product-price">${(product.price / 100).toFixed(2)}</span>
              <button className="view-details" onClick={() => setLocation(`/product/${product.id}`)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
