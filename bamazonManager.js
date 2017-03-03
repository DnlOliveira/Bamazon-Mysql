//npms required
var inquirer = require('inquirer');
var mysql = require('mysql');
var table = require('console.table');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'Bamazon'
});


connection.connect(function(err) {
  if (err) throw err;
  mainMenu();
});

function mainMenu() {
  inquirer.prompt({
    type: 'list',
    name: 'manage',
    message: 'What do you want to do?',
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
  }).then(function(answer) {
    switch (answer.manage) {
      case "View Products for Sale":
        inventory();
        break;
      case "View Low Inventory":
        lowInventory();
        break;
      case "Add to Inventory":
        addInventory();
        break;
      case "Add New Product":
        newItem();
        break;
    }
  });
}//mainMenu function

function inventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if(err) throw err;

    console.log("\n");
    console.table(res);
    console.log("\n");
  }).on('end', mainMenu);
}//inventory function

function lowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
    console.log("\n");
    console.table(res);
    console.log("\n");
  }).on('end', mainMenu);
}//lowInventory function

function addInventory() {
  var id = 0;
  var quantity = 0;
  inquirer.prompt([{
    type: 'input',
    name: 'id',
    message: 'Enter item BY ID to add inventory'
  },
  {
    type: 'input',
    name: 'amount',
    message: 'Add how many?'
  }]).then(function(answer) {
    id = answer.id;
    quantity = answer.amount;
    console.log(id);
    console.log(quantity);
    var query = "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id=?";
    connection.query(query, [quantity, id], function() {
      console.log("Inventory Updated...");
    }).on('end', mainMenu);
  });
}//addInventory function

function newItem() {
  inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'Enter name of new product'
  },{
    type: 'input',
    name: 'department',
    message: 'Enter name of department'
  },{
    type: 'input',
    name: 'price',
    message: 'Enter price for item'
  },{
    type: 'input',
    name: 'stock',
    message: 'Enter the stock quantity'
  }]).then(function(answer) {
    var query = "INSERT INTO products SET ?";
    connection.query(query, {
      product_name: answer.name,
      department_name: answer.department,
      price: answer.price,
      stock_quantity: answer.stock
    }, function(err, res) {
      console.log("Item Added...");
    }).on('end', mainMenu);
  });
}//newItem function
