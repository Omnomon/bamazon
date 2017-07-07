const mysql = require("mysql")
const inquirer = require("inquirer")
require("console.table")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "AAAbbb123!@#",
    database: "bamazon"
})

// display all items for sale

function displayTableFromSql() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM products", function(err, data) {
            if (err) throw err
            console.log(`\n`)
            console.table(data)
        })
        resolve(connection.end())
    })
}

displayTableFromSql().then(function(err, res) {
    if (err) throw err
    askUserWhatToBuy()
})

function askUserWhatToBuy() {
    inquirer.prompt([{
        type: "input",
        name: "id",
        message: "Please enter the ID of the item you would like to buy"
    }, {
        type: "input",
        name: "quantity",
        message: "Please enter how many you would like to buy"
    }]).then(function(response) {
        console.log(response)
    })
}
