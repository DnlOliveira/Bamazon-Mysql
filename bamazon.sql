create database Bamazon;

use Bamazon;

create table products (
	item_id integer(11) primary key auto_increment not null,
    product_name varchar(30) not null,
    department_name varchar(30) not null,
    price decimal(5,2),
    stock_quantity integer(11)
);

select * from products;

insert into 
	products(product_name, department_name, price, stock_quantity)
values
	("MacBook Pro", "Computers", 1000.00, 8),
    ("iMac", "Computers", 2000.00, 12),
    ("Apple Watch", "Wearables", 400.00, 25),
    ("Fitbit Charge 2", "Wearables", 200.00, 34),
    ("iPad Air", "Tablets", 500.00, 25),
    ("iPad Pro", "Tablets", 900.00, 32);
    
SELECT product_name FROM products WHERE item_id=1;

UPDATE products SET stock_quantity=stock_quantity + 5 WHERE item_id=1;