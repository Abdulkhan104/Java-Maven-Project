// src/components/Navbar.js
import React from 'react';
import './Navbar.css'; // We'll create this CSS file next

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <h2>Flipkart Clone</h2>
      </div>

      <div className="nav-search">
        <input type="text" placeholder="Search for products, brands and more" />
        <button>🔍</button>
      </div>

      <div className="nav-actions">
        <button className="profile-btn">My Profile</button>
        <button className="cart-btn">🛒 Cart</button>
      </div>
    </nav>
  );
};

export default Navbar;