🛒 Java E-Commerce Project

A simple and scalable E-Commerce web application built using Java. This project demonstrates core concepts like product management, user authentication, cart functionality, and order processing.


================================= DATABSE =======================================

CREATE DATABASE flipkart_clone_db;
USE flipkart_clone_db;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- Store encrypted passwords!
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- Store encrypted passwords!
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    image_url VARCHAR(500),
    `order` INT DEFAULT 0 -- To control the display order in the navbar
);

-- Insert your requested categories
INSERT INTO categories (name, `order`) VALUES
('Fashion', 1),
('Mobiles', 2),
('Beauty', 3),
('Electronics', 4),
('Home', 5),
('Appliances', 6),
('Toys', 7),
('Food & Drinks', 8),
('Auto Accessories', 9),
('2 Wheelers', 10),
('Sports & Fitness', 11),
('Books & More', 12),
('Furniture', 13);


CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(500),
    category_id BIGINT NOT NULL,
    stock_quantity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

CREATE TABLE cart_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO products (name, description, price, category_id, stock_quantity) VALUES
('Men''s Casual Shirt', 'Comfortable cotton shirt', 999.00, 1, 100),
('iPhone 15', 'Latest Apple smartphone', 79999.00, 2, 50),
('Face Cream', 'Moisturizing face cream', 499.00, 3, 200),
('Smart TV 55"', '4K Ultra HD Smart TV', 49999.00, 4, 30);




=======2
-- Create and use database
CREATE DATABASE IF NOT EXISTS flipkart_clone_db;
USE flipkart_clone_db;

-- Users table (authentication)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    mobile VARCHAR(15),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    pincode VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table (your services)
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    icon_url VARCHAR(500),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    discount_percent INT DEFAULT 0,
    image_url VARCHAR(500),
    images TEXT, -- JSON array of multiple images
    category_id BIGINT,
    brand VARCHAR(100),
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INT DEFAULT 0,
    stock_quantity INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT FALSE,
    specifications TEXT, -- JSON object
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_cart_item (user_id, product_id)
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    final_amount DECIMAL(10, 2) NOT NULL,
    order_status VARCHAR(50) DEFAULT 'PENDING',
    payment_status VARCHAR(50) DEFAULT 'PENDING',
    payment_method VARCHAR(50),
    shipping_address TEXT NOT NULL,
    shipping_city VARCHAR(50),
    shipping_state VARCHAR(50),
    shipping_pincode VARCHAR(10),
    tracking_number VARCHAR(100),
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivered_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- Wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_wishlist (user_id, product_id)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insert Categories
INSERT INTO categories (name, description, display_order, icon_url) VALUES
('Fashion', 'Clothing, footwear, accessories', 1, 'https://img.icons8.com/fluency/48/jeans.png'),
('Mobiles', 'Smartphones, accessories', 2, 'https://img.icons8.com/fluency/48/smartphone.png'),
('Beauty', 'Cosmetics, skincare, haircare', 3, 'https://img.icons8.com/fluency/48/lipstick.png'),
('Electronics', 'Laptops, cameras, audio', 4, 'https://img.icons8.com/fluency/48/electronics.png'),
('Home', 'Furniture, decor, kitchen', 5, 'https://img.icons8.com/fluency/48/home.png'),
('Appliances', 'AC, fridge, washing machine', 6, 'https://img.icons8.com/fluency/48/microwave.png'),
('Toys', 'Games, puzzles, collectibles', 7, 'https://img.icons8.com/fluency/48/toy.png'),
('Food & Drinks', 'Groceries, beverages', 8, 'https://img.icons8.com/fluency/48/food.png'),
('Auto Accessories', 'Car parts, tools', 9, 'https://img.icons8.com/fluency/48/car.png'),
('2 Wheelers', 'Bikes, scooters, gear', 10, 'https://img.icons8.com/fluency/48/motorbike.png'),
('Sports & Fitness', 'Gym equipment, sportswear', 11, 'https://img.icons8.com/fluency/48/sports.png'),
('Books & More', 'Books, stationery', 12, 'https://img.icons8.com/fluency/48/book.png'),
('Furniture', 'Sofas, beds, tables', 13, 'https://img.icons8.com/fluency/48/sofa.png');

-- Insert Sample Products
INSERT INTO products (name, description, price, original_price, discount_percent, category_id, brand, rating, review_count, stock_quantity, is_featured, is_new) VALUES
-- Fashion Products
('Men''s Classic Cotton Shirt', 'Premium quality cotton shirt for men', 1299, 2499, 48, 1, 'Roadster', 4.3, 1234, 150, TRUE, FALSE),
('Women''s Denim Jacket', 'Stylish denim jacket for women', 1999, 3999, 50, 1, 'Levis', 4.5, 892, 75, TRUE, TRUE),
('Sneakers for Men', 'Comfortable sports sneakers', 1499, 2999, 50, 1, 'Puma', 4.2, 2341, 200, FALSE, FALSE),

-- Mobiles
('iPhone 15 Pro', 'Latest Apple smartphone with A17 Pro chip', 134900, 144900, 7, 2, 'Apple', 4.8, 5421, 50, TRUE, TRUE),
('Samsung Galaxy S24 Ultra', 'Premium Android smartphone', 129999, 139999, 7, 2, 'Samsung', 4.7, 3987, 75, TRUE, FALSE),
('OnePlus 12', 'Flagship killer smartphone', 64999, 69999, 7, 2, 'OnePlus', 4.6, 2876, 100, FALSE, TRUE),

-- Beauty
('Vitamin C Face Serum', 'Brightening and anti-aging serum', 599, 1299, 54, 3, 'Mamaearth', 4.4, 5432, 300, TRUE, FALSE),
('Matte Lipstick Set', 'Set of 5 long-lasting lipsticks', 999, 1999, 50, 3, 'Maybelline', 4.3, 2987, 150, FALSE, TRUE),

-- Electronics
('MacBook Pro 14"', 'Apple M3 chip, 16GB RAM, 512GB SSD', 169900, 179900, 6, 4, 'Apple', 4.9, 876, 30, TRUE, TRUE),
('Sony WH-1000XM5', 'Industry-leading noise cancellation headphones', 29990, 34990, 14, 4, 'Sony', 4.8, 2341, 60, TRUE, FALSE),

-- Home
('Memory Foam Mattress', 'Queen size orthopedic mattress', 15999, 29999, 47, 5, 'Wakefit', 4.5, 987, 40, TRUE, FALSE),
('Air Fryer', '5.5L digital air fryer', 4999, 9999, 50, 5, 'Philips', 4.4, 1654, 80, FALSE, TRUE),

-- Appliances
('LG 1.5 Ton 5 Star AC', 'WiFi enabled smart AC', 45990, 55990, 18, 6, 'LG', 4.6, 234, 25, TRUE, FALSE),
('Samsung 8kg Washing Machine', 'Fully automatic front load', 35990, 45990, 22, 6, 'Samsung', 4.5, 432, 30, FALSE, FALSE),

-- Toys
('LEGO Creator 3in1', 'Building blocks set - 500 pieces', 2499, 3999, 38, 7, 'LEGO', 4.7, 876, 120, TRUE, TRUE),
('Remote Control Car', 'High speed RC car for kids', 1899, 2999, 37, 7, 'Hot Wheels', 4.3, 543, 200, FALSE, FALSE),

-- Books
('Atomic Habits', 'James Clear - Bestseller', 399, 799, 50, 12, 'Penguin', 4.9, 12345, 500, TRUE, FALSE),
('Rich Dad Poor Dad', 'Robert Kiyosaki', 299, 599, 50, 12, 'Plata', 4.7, 8765, 400, FALSE, FALSE),

-- Sports
('Yoga Mat', '6mm TPE non-slip exercise mat', 999, 1999, 50, 11, 'Decathlon', 4.4, 2341, 300, FALSE, TRUE),
('Dumbbells Set', '20kg adjustable dumbbell set', 3999, 7999, 50, 11, 'Body Solid', 4.5, 876, 50, TRUE, FALSE);

-- Insert sample user
INSERT INTO users (full_name, email, password_hash, mobile, address, city, state, pincode) VALUES
('John Doe', 'john@example.com', '$2a$10$rD.zQhEQsXNgEqZM8.KVueR2LkFvN9Xn6Zu6xXhC3KuUxvF.vqjTe', '9876543210', '123 Main St', 'Mumbai', 'Maharashtra', '400001');
-- Note: password is "password123" (hashed)


=================================== APPLICATION.PROPERTIES =====================================

# MySQL Database Connection Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/flipkart_clone_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

# JPA Configuration (to auto-create tables based on our Java models)
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect


===2 

# Server Configuration
server.port=8080
server.error.include-message=always

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/flipkart_clone_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=your_password_here
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true

# Logging
logging.level.org.springframework.web=DEBUG
logging.level.org.hibernate.SQL=DEBUG

# CORS Configuration (will be handled in WebConfig)
# File Upload
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB


================================= add also data =====================================

-- Use your database
USE flipkart_clone_db;

-- Add more categories
INSERT INTO categories (name, description, display_order, icon_url) VALUES
('Premium Collection', 'Luxury and premium products', 14, 'https://img.icons8.com/fluency/48/diamond.png'),
('Gaming', 'Gaming consoles, accessories', 15, 'https://img.icons8.com/fluency/48/gaming.png'),
('Pet Supplies', 'Food, toys, accessories for pets', 16, 'https://img.icons8.com/fluency/48/dog.png'),
('Office Supplies', 'Stationery, furniture, equipment', 17, 'https://img.icons8.com/fluency/48/office.png');

-- Add 50+ more products
INSERT INTO products (name, description, price, original_price, discount_percent, category_id, brand, rating, review_count, stock_quantity, is_featured, is_new, image_url) VALUES
-- Fashion Products (Category 1)
('Men''s Slim Fit Jeans', 'Comfortable stretchable denim jeans', 999, 1999, 50, 1, 'Levis', 4.4, 2345, 200, TRUE, FALSE, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200'),
('Women''s A-Line Dress', 'Floral printed summer dress', 1499, 2999, 50, 1, 'Biba', 4.6, 1234, 150, TRUE, TRUE, 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=200'),
('Sports Shoes', 'Running shoes for men and women', 1999, 3999, 50, 1, 'Nike', 4.5, 3456, 300, FALSE, FALSE, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200'),
('Leather Wallet', 'Genuine leather wallet for men', 499, 999, 50, 1, 'WildHorn', 4.3, 789, 500, FALSE, FALSE, 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200'),
('Women''s Handbag', 'Designer handbag for women', 2499, 4999, 50, 1, 'Caprese', 4.7, 2341, 100, TRUE, FALSE, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200'),

-- Mobiles (Category 2)
('OnePlus 12R', 'Latest OnePlus smartphone', 39999, 44999, 11, 2, 'OnePlus', 4.6, 2345, 80, TRUE, TRUE, 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=200'),
('Google Pixel 8', 'Pure Android experience', 74999, 79999, 6, 2, 'Google', 4.8, 1234, 45, TRUE, FALSE, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200'),
('Xiaomi 14 Pro', 'Premium flagship', 69999, 74999, 7, 2, 'Xiaomi', 4.4, 987, 60, FALSE, TRUE, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200'),
('Nothing Phone 2', 'Unique design smartphone', 44999, 49999, 10, 2, 'Nothing', 4.5, 543, 40, FALSE, FALSE, 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=200'),
('iQOO Neo 9 Pro', 'Gaming smartphone', 35999, 39999, 10, 2, 'iQOO', 4.3, 876, 90, FALSE, TRUE, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200'),

-- Electronics (Category 4)
('iPad Air 5th Gen', '10.9-inch tablet with M1 chip', 59900, 64900, 8, 4, 'Apple', 4.9, 2341, 35, TRUE, FALSE, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200'),
('Dell XPS 15', 'Premium laptop for creators', 149990, 169990, 12, 4, 'Dell', 4.7, 876, 25, TRUE, TRUE, 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200'),
('Logitech MX Master 3S', 'Wireless mouse', 8995, 10995, 18, 4, 'Logitech', 4.8, 1543, 120, FALSE, FALSE, 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200'),
('Keychron K2', 'Mechanical keyboard', 8499, 9999, 15, 4, 'Keychron', 4.6, 987, 80, FALSE, TRUE, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200'),
('LG 27" 4K Monitor', 'Ultra HD IPS display', 34990, 39990, 13, 4, 'LG', 4.5, 654, 50, FALSE, FALSE, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200'),

-- Beauty (Category 3)
('Lakme Absolute Foundation', 'Full coverage foundation', 799, 1599, 50, 3, 'Lakme', 4.3, 2345, 200, FALSE, FALSE, 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200'),
('Nyx Professional Makeup', 'Eyeshadow palette', 1299, 2499, 48, 3, 'Nyx', 4.4, 1876, 150, TRUE, TRUE, 'https://images.unsplash.com/photo-1512496015851-a90fb38f96bc?w=200'),
('Garnier Face Wash', 'Skin brightening face wash', 249, 499, 50, 3, 'Garnier', 4.2, 5432, 500, FALSE, FALSE, 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200'),
('Loreal Paris Shampoo', 'Total repair 5 shampoo', 399, 799, 50, 3, 'Loreal', 4.3, 3987, 400, FALSE, FALSE, 'https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=200'),
('Biotique Face Cream', 'Ayurvedic face cream', 299, 599, 50, 3, 'Biotique', 4.1, 2341, 350, FALSE, FALSE, 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200'),

-- Home & Furniture (Category 5 & 13)
('Velvet Sofa Set', '3 seater velvet sofa', 45999, 65999, 30, 13, 'UrbanLadder', 4.5, 432, 20, TRUE, FALSE, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200'),
('Wooden Dining Table', '6 seater dining table', 34999, 49999, 30, 13, 'Pepperfry', 4.4, 321, 15, TRUE, TRUE, 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=200'),
('Queen Size Bed', 'Wooden bed with storage', 29999, 44999, 33, 13, 'Wakefit', 4.6, 654, 30, FALSE, FALSE, 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=200'),
('Study Table', 'Modern study desk', 7999, 12999, 38, 13, 'Green Soul', 4.3, 234, 50, FALSE, FALSE, 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200'),
('Office Chair', 'Ergonomic chair', 12999, 19999, 35, 13, 'Featherlite', 4.7, 876, 40, FALSE, TRUE, 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=200'),

-- Sports & Fitness (Category 11)
('Adjustable Dumbbells', '20kg adjustable dumbbell set', 4999, 9999, 50, 11, 'Bodyline', 4.4, 1234, 100, TRUE, FALSE, 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=200'),
('Exercise Cycle', 'Indoor cycling bike', 19999, 29999, 33, 11, 'Aerofit', 4.3, 543, 25, FALSE, TRUE, 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=200'),
('Yoga Mat', 'Premium TPE yoga mat', 999, 1999, 50, 11, 'Protonic', 4.5, 2341, 200, FALSE, FALSE, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=200'),
('Protein Powder', 'Whey protein 2kg', 3999, 5999, 33, 11, 'MuscleBlaze', 4.6, 3456, 150, TRUE, FALSE, 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=200'),
('Running T-shirt', 'Quick dry running t-shirt', 799, 1599, 50, 11, 'Puma', 4.2, 987, 300, FALSE, FALSE, 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200'),

-- Books (Category 12)
('The Psychology of Money', 'Morgan Housel - Bestseller', 299, 499, 40, 12, 'Harriman', 4.9, 9876, 400, TRUE, FALSE, 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=200'),
('Deep Work', 'Cal Newport - Focused success', 399, 799, 50, 12, 'Grand Central', 4.8, 5432, 300, FALSE, FALSE, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200'),
('The Alchemist', 'Paulo Coelho - Classic', 249, 499, 50, 12, 'HarperOne', 4.7, 12345, 500, FALSE, TRUE, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200'),
('Think and Grow Rich', 'Napoleon Hill', 299, 599, 50, 12, 'Penguin', 4.6, 8765, 350, FALSE, FALSE, 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=200'),
('Atomic Habits', 'James Clear', 399, 799, 50, 12, 'Penguin', 4.9, 23456, 600, TRUE, FALSE, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200'),

-- Toys (Category 7)
('LEGO Creator Set', '500 pieces building set', 2999, 4999, 40, 7, 'LEGO', 4.7, 2341, 80, TRUE, FALSE, 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=200'),
('Remote Control Car', 'High speed RC car', 1999, 3999, 50, 7, 'Hot Wheels', 4.4, 1876, 120, FALSE, TRUE, 'https://images.unsplash.com/photo-1566565954016-6afb815ffc8e?w=200'),
('Barbie Dreamhouse', 'Dreamhouse playset', 8999, 12999, 31, 7, 'Barbie', 4.5, 987, 40, FALSE, FALSE, 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=200'),
('Chess Board', 'Wooden chess set', 1499, 2999, 50, 7, 'Square', 4.3, 543, 150, FALSE, FALSE, 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=200'),
('Cricket Set', 'Full cricket kit for kids', 2499, 4999, 50, 7, 'SS', 4.4, 876, 100, FALSE, FALSE, 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=200');

-- Create User Roles Table
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Create User Roles Junction Table
CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Insert Roles
INSERT INTO roles (name) VALUES ('ROLE_USER'), ('ROLE_ADMIN');

-- Insert Admin User (password: admin123)
INSERT INTO users (full_name, email, password_hash, mobile) VALUES
('Admin User', 'admin@veecart.com', '$2a$10$rD.zQhEQsXNgEqZM8.KVueR2LkFvN9Xn6Zu6xXhC3KuUxvF.vqjTe', '9999999999');

-- Assign Admin Role
INSERT INTO user_roles (user_id, role_id) VALUES (2, 2);

-- Create Orders table if not exists
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    final_amount DECIMAL(10,2) NOT NULL,
    order_status VARCHAR(50) DEFAULT 'PENDING',
    payment_status VARCHAR(50) DEFAULT 'PENDING',
    payment_method VARCHAR(50),
    shipping_address TEXT NOT NULL,
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivered_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Order Items table
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);