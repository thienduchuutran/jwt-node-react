//this is where we define the routes for the app
import express from 'express'
import homeController from '../controller/homeController'

const router = express.Router()

const initWebRoutes = (app) => {
    //path, handler
    router.get("/", homeController.handleHelloWorld)

    router.get("/user", homeController.handleUserPage)

    router.post("/users/create-user", homeController.handleCreateNewUser)
    router.post("/delete-user/:id", homeController.handleDeleteUser)
    router.get("/update-user/:id", homeController.getUpdateUserPage)    
    return app.use("/", router) //this is how we want our web to start with
}

export default initWebRoutes