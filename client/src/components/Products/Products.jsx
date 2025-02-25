
import { useState, useEffect } from 'react';
import './Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
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
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price}</p>
            <button className="buy-now">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
