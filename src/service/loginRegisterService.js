import bcrypt, { hash } from 'bcryptjs';
import { raw } from "body-parser"
import db from "../models/models"
const salt = bcrypt.genSaltSync(10);
import { Op } from 'sequelize';

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt)
    return hashPassword
}

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: {email: userEmail}
    })
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

    let isPhoneExist = await checkPhoneExist(rawUserData.phone)
    if(isPhoneExist){
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
        console.log(e)
        return {
            EM: 'Something wrong while creating new user in db',
            EC: -2
        }
    }

}

const checkPassword = async (inputPassword, hashPassword) => {
    return await bcrypt.compareSync(inputPassword, hashPassword);
}

const handleUserLogin = async (rawData) => {
    try{
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    {
                        email: rawData.valueLogin
                    },
                    {
                        phone: rawData.valueLogin
                    }
                ]
            }
        })
        
        if (user){
            let isCorrectPassword = await checkPassword(rawData.password, user.password)
            if (isCorrectPassword){
                return {
                    EM: 'ok',
                    EC: 0,
                    DT: ''
                }
            }
        }
        console.log('not found user with email/phone', rawData.valueLogin, " password: ", rawData.password)
        return {
            EM: 'Your email/phone number or password incorrected',
            EC: 1,
            DT: ''
        }

    }catch(e){
        console.log(e)
        return {
            EM: 'Something wrong while creating new user in db',
            EC: -2
        }
    }
}

module.exports = {
    registerUser, handleUserLogin
}