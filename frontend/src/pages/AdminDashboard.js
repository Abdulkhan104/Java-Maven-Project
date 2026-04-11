import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/login');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    try {
      const productsRes = await fetchProducts();
      const categoriesRes = await fetchCategories();
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
      
      const savedOrders = JSON.parse(localStorage.getItem('veecart_orders') || '[]');
      setOrders(savedOrders);
      
      const savedUsers = JSON.parse(localStorage.getItem('veecart_users') || '[]');
      setUsers(savedUsers);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const stats = {
    totalProducts: products.length,
    totalCategories: categories.length,
    totalOrders: orders.length,
    totalUsers: users.length + 1,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0)
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>VeeCart Admin</h2>
        </div>
        <nav className="admin-nav">
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            📊 Dashboard
          </button>
          <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
            🛍️ Products
          </button>
          <button className={activeTab === 'categories' ? 'active' : ''} onClick={() => setActiveTab('categories')}>
            📁 Categories
          </button>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            📦 Orders
          </button>
          <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
            👥 Users
          </button>
        </nav>
      </div>

      <div className="admin-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-stats">
            <h1>Dashboard Overview</h1>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🛍️</div>
                <div className="stat-info">
                  <h3>{stats.totalProducts}</h3>
                  <p>Total Products</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📁</div>
                <div className="stat-info">
                  <h3>{stats.totalCategories}</h3>
                  <p>Categories</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📦</div>
                <div className="stat-info">
                  <h3>{stats.totalOrders}</h3>
                  <p>Total Orders</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>{stats.totalUsers}</h3>
                  <p>Total Users</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <h3>₹{stats.totalRevenue.toLocaleString()}</h3>
                  <p>Total Revenue</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="products-management">
            <div className="section-header">
              <h2>Product Management</h2>
              <button className="add-btn">+ Add New Product</button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>₹{product.price}</td>
                    <td>{product.stockQuantity || 100}</td>
                    <td>
                      <button className="edit-btn">Edit</button>
                      <button className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-management">
            <h2>Order Management</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.orderNumber}</td>
                    <td>{order.customerName}</td>
                    <td>₹{order.total}</td>
                    <td><span className={`status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                    <td>
                      <button className="view-btn">View</button>
                      <button className="update-btn">Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;