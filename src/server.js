import express from "express"
import configViewEngine from './configs/viewEngine'
import initWebRoutes from "./routes/web"
require("dotenv").config()  //this helps us get any vars in .env file

const app = express()
const PORT = process.env.PORT || 8080;


//config view engine
configViewEngine(app)

//init web routes
initWebRoutes(app)

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on port = " + PORT)
})