import userServices from '../service/userServices' 

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

    userServices.createNewUser(email, username, password)

    return res.send('hi')
}

module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser
}