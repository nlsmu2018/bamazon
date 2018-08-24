//1. require mysql grabs the mysql from wherever its installed//
var mysql = require('mysql');

//2. Required for prompts
var inquirer = require('inquirer');

//3. Required for logging tables
require('console.table');

//4. Create connection between mysql and SQLdb
var connection = mysql.createConnection({
  host: "localhost",
// 5. Your port; if not 3306
  port: 3306,

//6. Your username
  user: "root",

//7. Your password
  password: "", //DONOT push password on github
  database: "bamazon"
});


//8. connect to mySQL database, connection should only be long enough so we can get the data
    connection.connect(function(err) {
    if (err) throw err;
//9. get all products
    allProducts().then(function(result) {
//10. then list them
    console.log("Please select a product.")
    result.forEach(function(item) {
    console.log('Item ID: ' + item.id + ' | Product Name: ' + item.product_name + ' | Price: ' + item.price);
    });
//11. Asking user what they would like to do
    }).then(function() {
    return whatWouldYouLike();
    });
})

function allProducts(){
    return new Promise(function(resolve, reject) {

//12. query for all items in products table
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) reject(err);
            resolve(res);
        });
    });
}

//13. The app should then prompt users with two messages.
// The first prompt should ask them the ID of the product they would like to buy.

function whatWouldYouLike() {
    return inquirer.prompt([{
        name: 'product_id',
        message: 'What is the ID of the product you would like to buy?',
        type: 'input',
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                console.log('\nPlease enter a valid ID.');
                return false;
            }
        }
    }, 

//2nd message is asking the user how many units of the product they would like to buy.
{
    name: 'number_of_units',
    message: 'How many units would you like to buy?',
    type: 'input',
    validate: function(value) {
        if (isNaN(value) === false) {
            return true;
        } else {
            console.log('\nPlease enter a valid quantity.');
            return false;
        }
    }

//14. Storing the result
}]).then(function(answer) {
    return new Promise(function(resolve, reject) {
//15. query for all items in products table where the item_id is what was chosen
        connection.query("SELECT * FROM products WHERE id=?", answer.product_id, function(err, res) {
            if (err) reject(err);
            resolve(res);
        });
    }).then(function(result) {

//16. Once the customer has placed the order, it should check if  the store has enough of the product to meet the customer's request.
//If quantity is not sufficient, then app logs a phrase  `Insufficient quantity!`, and also prevents the order from going through.
        if (answer.number_of_units > result[0].stock_quantity) {
            return "Insufficient quantity!";
        // if there are enough
        } else {
            var object = {};
            // answer is the users responses to the prompts
            object.answer = answer;
            // result is the results of the query
            object.result = result;
            return object;
        }
    }).catch(function(err) {
        console.log(err);
        connection.destroy();
    }).then(function(object) {

//17. If there is sufficient stock then 
//a. order should go throw successfully
//b. update the sql db to reflect the remaining quantity
//c. Once the order goes thru show the total cost to the user
if (object.answer) {
    var newQuantity = object.result[0].stock_quantity - object.answer.number_of_units;
    var product = object.answer.product_id;
    var totalCost = (object.result[0].price * object.answer.number_of_units).toFixed(2);
    // query that updates the quantity of the item
    connection.query("UPDATE products SET stock_quantity=? WHERE id=?", [newQuantity, product], function(err, res) {
        if (err) reject(err);
        console.log('Your total cost is $' + totalCost);
        // destroy connection
        connection.destroy();
    });
} else {
    console.log(object);
    // destroy connection
    connection.destroy();
}
});
});
}
