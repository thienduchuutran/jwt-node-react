//this is where we define the routes for the app
import express from 'express'
import apiController from '../controller/apiController'

const router = express.Router()

const initApiRoutes = (app) => {
    //path, handler

    router.get("/test-api", apiController.testApi)
    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)

    return app.use("/api/v1/", router) //this is how we want our web to start with
}

export default initApiRoutes