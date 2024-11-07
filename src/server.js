import express from "express"
import configViewEngine from './config/viewEngine'
import initWebRoutes from "./routes/web"
require("dotenv").config()  //this helps us get any vars in .env file
import bodyParser from 'body-parser'
import initApiRoutes from "./routes/api"
import configCors from "./config/cors"
// import connection from "./config/connectDB.js"


const app = express()
const PORT = process.env.PORT || 8080;

//config cors
configCors(app)

//config view engine
configViewEngine(app)

//config body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//test connection DB
// connection()

//init web routes
initWebRoutes(app)
//init api routes
initApiRoutes(app)

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on port = " + PORT)
})