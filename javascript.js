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
function checkTable() {
    connection.query("SELECT * FROM products", function(err, data) {
        if (err) throw err
        console.log(`Current Listing\n`)
        console.table(data)
    })
}

const askUserWhatToBuy = function() {
    checkTable()
    inquirer.prompt([{
        type: "input",
        name: "id",
        message: "Please enter the ID of the item you would like to buy"
    }, {
        type: "input",
        name: "quantity",
        message: "Please enter how many you would like to buy"
    }]).then(value => {
        let id = parseInt(value.id)
        let quantity = value.quantity
        connection.query(`SELECT * FROM products WHERE id = ${id}`, function(err, data) {
            if (err) {
                throw err
            } else if (data.length === 0) {
                console.log("Invalid Id. Please pick a valid Id.")
            } else {
                console.log("good id")
            }
        })

        connection.query(`SELECT * FROM products WHERE quantity > ${quantity} AND id = ${id} `, function(err, data) {
            if (err) {
                throw err
            } else if (data.length === 0) {
                console.log("Invalid quantity. Please pick a valid quantity.")
            } else {
                console.log("good selection")
            }
        })

        connection.query(`UPDATE products SET quantity = quantity - ${quantity} WHERE id = ${id} `, function(err, data) {
            if (err) {
                throw err
            } else {
                console.log("updated")
                console.log('\n')
                checkTable()
            }
        })

    }).catch(function(error) {
        console.log(error)
    }).then(function() {
        connection.end()
    }).catch(function(err) {
        console.log(err)
    })
}

function managerView() {
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "Select an Action",
        choices: ["View Products for Sale", "View Low Inventory", "Increase Inventory", "Add New Product"]
    }]).then(function(response) {
            let state = response.action
            console.log(state)
            if (state === "View Products for Sale") {
                checkTable()
                connection.end()
                return
            } else if (state === "View Low Inventory") {
                connection.query("SELECT item_name, quantity FROM products WHERE quantity < 10", function(err, data) {
                    if (err) throw err
                    console.log(`Items with low quantity\n`)
                    console.table(data)
                    connection.end()
                })
                return
            } else if (state === "Add New Product") {
                inquirer.prompt([{
                    type: "input",
                    name: "name",
                    message: "Type in the name of the new item"
                }, {
                    type: "list",
                    name: "department",
                    message: "Select the department of the item",
                    choices: ["electronics", "food", "clothing", "tools"]
                }, {
                    type: "input",
                    name: "price",
                    message: "Please select a price for each item"
                }, {
                    type: "input",
                    name: "quantity",
                    message: "Please enter a quantity for the number of items"
                }]).then(function(response) {
                    console.log(response)
                    connection.query(`INSERT INTO products (item_name, department_name, price, quantity) VALUES ("${response.name}", "${response.department}", ${parseInt(response.price)}, ${parseInt(response.quantity)})`, function(err, data) {
                        if (err) throw err
                        console.log(`${data.affectedRows} added`)
                        checkTable()
                        connection.end()
                    })
                })
                return
            } else if (state === "Increase Inventory") {

                checkTable()
                inquirer.prompt([{
                    type: "input",
                    name: "id",
                    message: "Select the Id of the item to add Inventory to"
                }, {
                    type: "input",
                    name: "quantity",
                    message: "Enter the number of inventory added"
                }]).then((response) => {
                    connection.query(`UPDATE products SET quantity = quantity + ${parseInt(response.quantity)} WHERE id = ${parseInt(response.id)}`, function(err, data) {
                        if (err) throw err
                            console.log(`${data.affectedRows} updated`)
                            checkTable()
                            connection.end()
                        })
                });
                return
            }

    }).catch(function(err) {
    console.log(err)
})
}

managerView()
