CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (

id INTEGER(11) AUTO_INCREMENT NOT NULL,

name VARCHAR(30) NOT NULL,

department_name ENUM ('electronics', 'clothing', 'food', 'tools') NOT NULL ,

price INTEGER(11) NOT NULL, 

quantity INTEGER (11) NOT NULL,

PRIMARY KEY (id)

);

INSERT INTO products (name, department_name, price, quantity)
VALUES ("razor", "tools", 2, 20),
("phone", "electronics", 1, 500),
("shirt", "clothing", 10, 50),
("shoes", "clothing", 10, 20),
("steak", "food", 20, 15),
("charger", "electronics", 10, 100),
("hammer", "tools", 2, 7),
("clock" , "electronics", 10, 50),
("pineapple", "food", 15, 20),
("kiwi", "food", 20, 60);





