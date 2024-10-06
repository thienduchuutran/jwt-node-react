import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

import mysql from 'mysql2/promise';
import bluebird from 'bluebird';


const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt)
    return hashPassword
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password)
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });

    try{
        const [rows, fields] = await connection.execute(`INSERT INTO users (email, username, password) VALUES (?, ?, ?)`, [email, username, hashPass])
    }catch(e){
        console.log('check error: ', e)
    }

}

const getUserList = async () => {
    // Create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    try{
        const [rows, fields] = await connection.execute(`Select * from users`)
        return rows
    }
    catch(e){
        console.log('check error: ', e);
    }
}

const deleteUser = async (id) => {
    //
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    try{
        const [rows, fields] = await connection.execute(`DELETE FROM users WHERE id=?`, [id])
        return rows
    }
    catch(e){
        console.log('check error: ', e);
    }
}

module.exports = {
    createNewUser, getUserList, deleteUser
}