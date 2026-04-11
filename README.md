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