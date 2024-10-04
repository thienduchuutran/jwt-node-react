
import mysql from 'mysql2';

import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt',
});

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs")
}

const handleUserPage = (req, res) => {
    return res.render("user.ejs")
}

const handleCreateNewUser = (req, res) => { //when working with body parser aka req.body, we need values from "name" field in the forms on FE
    let email = req.body.email
    let username = req.body.username
    let password = req.body.password

    let hashPassword = bcrypt.hashSync(password, salt)

    let check = bcrypt.compareSync(password, hashPassword); 
    console.log("check password ", check)

    
    connection.query(
        `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`, [email, username, password],
        function(err, results, fields){
            if(err){
                console.log(err)
            }
        }
    );
    return res.send('hi')
}

module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser
}