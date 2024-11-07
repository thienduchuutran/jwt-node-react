import { raw } from "body-parser"
import db from "../models/models"

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


const registerUser = (rawUserData) => {
    //check email/phone number exist
    let isEmailexist = checkEmailExist(rawUserData.email)
    if(isEmailexist){
        return {
            EM: 'The email already existed',
            EC: 1
        }
    }

    let isPhoneexist = checkPhoneExist(rawUserData.phone)
    if(isPhoneexist){
        return {
            EM: 'The phone number already existed',
            EC: 1
        }
    }
    //hash user password

    //create new user
}

module.exports = {
    registerUser
}