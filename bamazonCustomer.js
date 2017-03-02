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

//if connection successful call first function
connection.connect(function(err) {
  if (err) throw err;
  showInventory();
});


function showInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if(err) throw err;

    console.log("\n");
    console.table(res);
    console.log("\n");
  }).on('end', buyerGuide);//connection query

}//showInventory function


function buyerGuide() {
  var id = 0;
  var item = "";
  var quantity = 0;

  inquirer.prompt({
    type: "input",
    name: "choice",
    message: "Select an item by ID"
  }).then(function(answer) {

    var query = "SELECT product_name FROM products WHERE item_id=?";
    connection.query(query, answer.choice, function(err, res) {
      id = answer.choice;
      item = res[0].product_name;
      console.log(item);

    }).on('end', function() {

      inquirer.prompt({
        type: "input",
        name: "quantity",
        message: "How many " + item + " would you like to buy?"
      }).then(function(ans) {
        quantity = ans.quantity;
        validate(id, quantity);
      });//2nd prompt
    });//on-end function
  });//1st prompt

}//buyerGuide function


function validate(id, amt) {
  var query = "SELECT stock_quantity FROM products WHERE item_id=?";
  connection.query(query, id, function(err, res) {
    if (amt > res[0].stock_quantity) {
      console.log("Insufficient Stock");
    } else {
      var query = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id=?";
      connection.query(query, [amt, id], function() {
        console.log("Item Bought");
        showInventory();
      });
    }
  });
}//validate function
