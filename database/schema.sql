-- Large Scale Inventory Management System Schema
-- Last updated: 2026-04-03

CREATE DATABASE IF NOT EXISTS inventory_management;
USE inventory_management;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'staff') DEFAULT 'staff',
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Suppliers Table
CREATE TABLE IF NOT EXISTS suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(50),
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    sku VARCHAR(50) UNIQUE NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    quantity INT DEFAULT 0,
    min_stock_level INT DEFAULT 10,
    supplier_id INT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    supplier_id INT NOT NULL,
    total_amount DECIMAL(10,2) DEFAULT 0.00,
    status ENUM('Pending', 'Completed', 'Cancelled') DEFAULT 'Pending',
    notes TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- 5. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 6. Inventory Transactions Table
CREATE TABLE IF NOT EXISTS inventory_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    type ENUM('IN', 'OUT') NOT NULL,
    quantity INT NOT NULL,
    notes TEXT,
    performed_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (performed_by) REFERENCES users(id)
);

-- SEED DATA (Defaults)
INSERT IGNORE INTO users (username, email, password, role, full_name) VALUES 
('admin', 'admin@inventory.com', '$2b$10$EPZ9S7T5Q97yI.6.H5N1.uYF0H97yI.6.H5N1.uYF0H97yI.6.H5N1', 'admin', 'System Administrator'),
('staff1', 'staff@inventory.com', '$2b$10$EPZ9S7T5Q97yI.6.H5N1.uYF0H97yI.6.H5N1.uYF0H97yI.6.H5N1', 'staff', 'Demo Staff');

INSERT IGNORE INTO suppliers (name, email, phone, city) VALUES 
('Global Electronics', 'sales@globalelectronics.com', '+1234567890', 'San Francisco'),
('Office Solutions', 'orders@officesolution.com', '+0987654321', 'New York');

INSERT IGNORE INTO products (name, description, sku, category, price, quantity, min_stock_level, supplier_id) VALUES 
('Wireless Mouse', 'Premium wireless ergonomic mouse', 'MS-004', 'Electronics', 25.99, 50, 10, 1),
('Monitor Stand', 'Adjustable dual monitor stand', 'ST-005', 'Furniture', 45.00, 15, 5, 2),
('HD Webcam', '1080p high definition webcam', 'WC-005', 'Electronics', 59.99, 12, 10, 1);
