// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { fetchCategories, fetchProducts } from '../services/api';
import './HomePage.css';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect runs when the component first loads
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch categories and products from our Java backend in parallel
        const [categoriesRes, productsRes] = await Promise.all([
          fetchCategories(),
          fetchProducts()
        ]);
        setCategories(categoriesRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Error fetching data from backend:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="homepage">
      {/* Category Strip Section */}
      <div className="category-strip">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            {/* <img src={category.imageUrl} alt={category.name} /> */}
            <span>{category.name}</span>
          </div>
        ))}
      </div>

      {/* Products Grid Section */}
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl || 'https://via.placeholder.com/200'} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;