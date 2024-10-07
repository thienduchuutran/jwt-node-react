import express from 'express'

/**
 * 
 * @param {*} app - express app
 */
const configViewEngine = (app) => {
    app.use(express.static('./src/public')) //doing this so we can view any images
    app.set("view engine", "ejs")
    app.set("views", "./src/views") //config where to find the UIs
}

export default configViewEngine