//this is where we define the routes for the app
import express from 'express'
import homeController from '../controller/homeController'

const router = express.Router()

const initWebRoutes = (app) => {
    //path, handler
    router.get("/", homeController.handleHelloWorld)

    router.get("/about", (req, res) => {
        return res.send("duc")
    })

    return app.use("/", router) //this is how we want our web to start with
}

export default initWebRoutes