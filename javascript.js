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

const displayTableFromSql = new Promise((resolve, reject) => {
    connection.query("SELECT * FROM products", function(err, data) {
        if (err) throw err
        console.log(`Current Listing\n`)
        console.table(data)
        resolve(data)
    })
})

const askUserWhatToBuy = new Promise((resolve, reject) => {
    inquirer.prompt([{
        type: "input",
        name: "id",
        message: "Please enter the ID of the item you would like to buy"
    }, {
        type: "input",
        name: "quantity",
        message: "Please enter how many you would like to buy"
    }]).then(function(response) {
        resolve(response)
    }).catch(function(error) {
        console.log(error)
    })
})


askUserWhatToBuy.then(value => {
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
            connection.query("SELECT * FROM products", function(err, data) {
                if (err) throw err
                console.log(`Updated Listing\n`)
                console.table(data)
            })
            connection.end()
        }


    })

})
