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

================  Phase 2 => Backend Development (Java Spring Boot) ===================


Now, we build the Java application that will act as the brain of our operation, handling API requests, business logic, and talking to the MySQL database we just created.

              ---  2.1. Initialize the Spring Boot Project  ----

Open your IDE (IntelliJ IDEA or VS Code with Java extensions).
Go to Spring Initializr to generate the project skeleton.

Configure it like this:

1. Project: Maven

2. Language: Java

3. Spring Boot: 3.1.x or 3.2.x (stable version)

4. Group: com.flipkart

5. Artifact: clone-backend

6. Dependencies: Add these four:

Spring Web (for building REST APIs)
Spring Data JPA (to easily connect and query the database)
MySQL Driver (to connect Java to MySQL)
Spring Boot DevTools (for automatic restarts during development) 
Click "Generate", download the .zip file, and extract it.

Open the extracted folder as a project in your IDE.

Project: Maven
Language: Java
Spring Boot: 3.5.13
Group: com.flipkart
Artifact: clone-backend
Package name: com.flipkart.clone.backend ✅
Packaging: Jar
Java: 17 ✅
Config: application.properties (simpler for beginners)

===========================

2.2. Configure the Database Connection
You need to tell Spring Boot how to find your MySQL database.

Navigate to the file src/main/resources/application.properties.

Replace the contents of this file with the following configuration. This tells Spring Boot to use MySQL, where it is, your username, and password.

# MySQL Database Connection Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/flipkart_clone_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

# JPA Configuration (to auto-create tables based on our Java models)
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

If using AWS RDS: Replace localhost:3306 with your RDS Endpoint. It will look like jdbc:mysql://flipkart-clone-db.xxxxxx.us-east-1.rds.amazonaws.com:3306/flipkart_clone_db.

Replace the username and password with the ones you created for your database.