//this is where we define the routes for the app
import express from 'express'
import apiController from '../controller/apiController'
import userController from '../controller/userController'

const router = express.Router()

const initApiRoutes = (app) => {
    //path, handler

    router.get("/test-api", apiController.testApi)
    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)

    router.get('/user/read', userController.readFunc)
    router.post('/user/create', userController.createFunc)
    router.put('/user/update', userController.updateFunc)
    router.delete('/user/delete', userController.deleteFunc)


    return app.use("/api/v1/", router) //this is how we want our web to start with
}

export default initApiRoutes