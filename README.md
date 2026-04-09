🛒 Java E-Commerce Project

A simple and scalable E-Commerce web application built using Java. This project demonstrates core concepts like product management, user authentication, cart functionality, and order processing.


======================  Phase-1  ================================
 
 Create our database first in Your AWS account or puluar site then connect and this querry 

 CREATE DATABASE flipkart_clone_db;
USE flipkart_clone_db;

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

===================================  Phase 2 ===============================


