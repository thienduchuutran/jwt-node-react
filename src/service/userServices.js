import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

import mysql from 'mysql2';

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
  });

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt)
    return hashPassword
}

const createNewUser = (email, password, username) => {
    let hashPass = hashUserPassword(password)

    connection.query(
        `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`, [email, username, hashPass],
        function(err, results, fields){
            if(err){
                console.log(err)
            }
        }
    );
}

const getUserList = () => {
    let users = []
    connection.query(
        `SELECT * FROM users`,
        function(err, results, fields){
            if(err){
                console.log(err)
            }
            console.log('check res ', results)
        }
    );
}

module.exports = {
    createNewUser, getUserList
}