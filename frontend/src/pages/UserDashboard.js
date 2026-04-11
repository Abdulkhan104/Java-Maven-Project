import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('veecart_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  if (!user) {
    return <div className="dashboard-container"><p>Please login to view dashboard</p><Link to="/login">Login</Link></div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="user-info">
          <div className="avatar">👤</div>
          <h3>{user.fullName}</h3>
          <p>{user.email}</p>
        </div>
        <nav className="dashboard-nav">
          <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
            📋 Profile
          </button>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            📦 My Orders
          </button>
          <button className={activeTab === 'wishlist' ? 'active' : ''} onClick={() => setActiveTab('wishlist')}>
            ❤️ Wishlist
          </button>
          <button className={activeTab === 'addresses' ? 'active' : ''} onClick={() => setActiveTab('addresses')}>
            📍 Addresses
          </button>
        </nav>
      </div>

      <div className="dashboard-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2>Profile Information</h2>
            <div className="profile-info">
              <div><strong>Full Name:</strong> {user.fullName}</div>
              <div><strong>Email:</strong> {user.email}</div>
              <div><strong>Mobile:</strong> {user.mobile || 'Not provided'}</div>
              <div><strong>Member Since:</strong> {new Date().toLocaleDateString()}</div>
            </div>
            <button className="edit-btn">Edit Profile</button>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            <h2>My Orders</h2>
            {orders.length === 0 ? (
              <div className="no-orders">
                <p>No orders yet</p>
                <Link to="/products" className="shop-now">Shop Now</Link>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span>Order #{order.orderNumber}</span>
                    <span className="order-status">{order.status}</span>
                  </div>
                  <div className="order-items">
                    {order.items.map(item => (
                      <div key={item.productId} className="order-item">
                        <span>{item.name} x {item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-total">Total: ₹{order.total}</div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="wishlist-section">
            <h2>My Wishlist</h2>
            <p>Coming soon - Save your favorite products!</p>
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="addresses-section">
            <h2>Saved Addresses</h2>
            <button className="add-address-btn">+ Add New Address</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;