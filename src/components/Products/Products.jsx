
import { useState } from 'react';
import './Products.css';

export default function Products() {
  const [filter, setFilter] = useState('all');
  
  const products = [
    { id: 1, name: 'Product 1', category: 'electronics', price: 99.99 },
    { id: 2, name: 'Product 2', category: 'clothing', price: 49.99 },
    { id: 3, name: 'Product 3', category: 'electronics', price: 149.99 },
  ];

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter);

  return (
    <div className="products-container">
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('electronics')}>Electronics</button>
        <button onClick={() => setFilter('clothing')}>Clothing</button>
      </div>
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button className="buy-now">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
