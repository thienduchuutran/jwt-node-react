import userServices from '../service/userServices' 

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs")
}

const handleUserPage = async (req, res) => {
    let usersList = await userServices.getUserList()
    return res.render("user.ejs", {usersList})
}

const handleCreateNewUser = async (req, res) => { //when working with body parser aka req.body, we need values from "name" field in the forms on FE
    let email = req.body.email
    let username = req.body.username
    let password = req.body.password

    userServices.createNewUser(email, username, password)
    let usersList = await userServices.getUserList()

    return res.redirect("/user")

}

const handleDeleteUser = (req, res) => {
    console.log("check id: ", req.params.id)
}

module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser,
    handleDeleteUser
}