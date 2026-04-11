import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const response = await fetchProductById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error loading product:', error);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.productId === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        quantity: quantity
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${quantity} × ${product.name} added to cart!`);
  };

  const buyNow = () => {
    addToCart();
    navigate('/cart');
  };

  if (loading) {
    return <div className="loading-spinner"><div className="spinner"></div></div>;
  }

  if (!product) {
    return <div className="error-message">Product not found</div>;
  }

  const discountAmount = product.originalPrice - product.price;
  const discountPercent = product.discountPercent || 
    Math.round((discountAmount / product.originalPrice) * 100);

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img 
              src={product.imageUrl || 'https://via.placeholder.com/500'} 
              alt={product.name} 
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1>{product.name}</h1>
          
          {product.brand && (
            <div className="brand">
              Brand: <span>{product.brand}</span>
            </div>
          )}

          {product.rating && (
            <div className="rating-section">
              <span className="rating-badge">⭐ {product.rating}</span>
              <span className="reviews-count">({product.reviewCount || 0} reviews)</span>
            </div>
          )}

          <div className="price-section">
            <div className="current-price">₹{product.price}</div>
            {product.originalPrice && (
              <>
                <div className="original-price">₹{product.originalPrice}</div>
                <div className="discount">{discountPercent}% off</div>
              </>
            )}
          </div>

          {product.description && (
            <div className="description">
              <h3>Product Description</h3>
              <p>{product.description}</p>
            </div>
          )}

          <div className="quantity-selector">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= (product.stockQuantity || 10)}
              >
                +
              </button>
            </div>
            {product.stockQuantity && (
              <span className="stock-status">
                {product.stockQuantity > 0 ? 
                  `In Stock (${product.stockQuantity} items)` : 
                  'Out of Stock'}
              </span>
            )}
          </div>

          <div className="action-buttons">
            <button onClick={addToCart} className="add-to-cart-btn">
              🛒 Add to Cart
            </button>
            <button onClick={buyNow} className="buy-now-btn">
              Buy Now
            </button>
          </div>

          <div className="delivery-info">
            <h4>Delivery Information</h4>
            <ul>
              <li>✓ Free delivery on orders above ₹999</li>
              <li>✓ Cash on Delivery available</li>
              <li>✓ 7 days return policy</li>
              <li>✓ 100% genuine products</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;