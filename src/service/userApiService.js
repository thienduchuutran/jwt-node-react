import db from "../models/models";

const getAllUser = async()=> { 
    try {
        let users = await db.User.findAll({
            attributes: ["id", "email", "phone", "sex"],
            include: {model: db.Group, attributes: ["name", "description"] }
        })
        if(users){
            return {
                EM: 'get data successfully',
                EC: 0,
                DT: users
            }
        }else{
            return {
                EM: 'get data successfully',
                EC: 0,
                DT: []
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'something wrong with service',
            EC: 1,
            DT: []
        }        
    }
}

const createNewUser = () => {
    
}

const updateUser = () => {

}

const deleteUser = () => {
    
}

module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser
}