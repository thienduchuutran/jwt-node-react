import bcrypt, { hash } from 'bcryptjs';
import { raw } from "body-parser"
import db from "../models/models"
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt)
    return hashPassword
}

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: {email: userEmail}
    })
    console.log(user)
    if(user){
        return true
    }
    return false
}

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: {phone: userPhone}
    })

    if(user){
        return true
    }
    return false
}


const registerUser = async(rawUserData) => {
    try {
    //check email/phone number exist
    let isEmailexist = await checkEmailExist(rawUserData.email)
    if(isEmailexist){
        return {
            EM: 'The email already existed',
            EC: 1
        }
    }

    let isPhoneexist = await checkPhoneExist(rawUserData.phone)
    if(isPhoneexist){
        return {
            EM: 'The phone number already existed',
            EC: 1
        }
    }

    //hash user password
    let hashPassword = hashUserPassword(rawUserData.password)
    
    //create new user
    await db.User.create({
        email: rawUserData.email,
        username: rawUserData.username,
        password: hashPassword,
        phone: rawUserData.phone
    })
    
    return {
        EM: 'The user is created successfully',
        EC: 0
    }

    } catch (e) {
        return {
            EM: 'Something wrong while creating new user in db',
            EC: -2
        }
    }

}

module.exports = {
    registerUser
}