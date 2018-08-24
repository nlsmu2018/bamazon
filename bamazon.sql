--Creating a database, ensuring the if there is already a db existing with the same name to drop it--
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

--Creating a table called Products inside the database--
CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (50) NULL,
department_name VARCHAR (50) NULL,
price DECIMAL (10,2) NULL,
stock_quantity INT NULL,
PRIMARY KEY (id)
);

--Populating values inside the table--
--1st category used Google Accessories--
INSERT INTO products (product_name , department_name, price, stock_quantity)
VALUES ("Google Home Max", "Google Accessories", 399.99, 30 ),
       ("Google Home Mini", "Google Accessories", 49.99, 25),
       ("Google Home", "Google Accessories", 129.99, 18),
       ("Google Chromecast Ultra", "Google Accessories", 69.99, 30),
       ("Google Max Mini Bundles", "Google Accessories", 399.99, 12);
     
--2nd category used is Nest Accessories--
INSERT INTO products (product_name , department_name, price, stock_quantity)
VALUES ("Nest Hello Video Doorbell", "Nest Accessories", 229.99, 17 ),
       ("Nest Cam Outdoor Security Camera" , "Nest Accessories", 199.99, 10),
       ("Nest Protect Smoke & CO Alarm", "Nest Accessories", 119.99, 24),
       ("Nest Learning Thermostat", "Nest Accessories", 249.99, 57),
       ("Nest Thermostat E", "Nest Accessories", 169.99, 56);

--3rd category used is Music Accessories--
INSERT INTO products (product_name , department_name, price, stock_quantity)
VALUES ("JBL Bar Studio", "Music Accessories", 149.99, 130 ),
       ("JBL Link 10 Activated Speaker" , "Music Accessories", 149.99, 145),
       ("JBL Link 20 Activated Speaker", "Music Accessories", 199.99, 120),
       ("JBL Link 300 Activated Speaker", "Music Accessories", 249.99, 85),
       ("Bose Solo 5 TV Sound System", "Music Accessories", 169.99, 12);

SELECT * FROM products;