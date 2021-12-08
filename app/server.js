const express = require("express");
const app = express();
const http = require("http")
const mongoose = require('mongoose');
const cors = require("cors")
module.exports = class Application{
    constructor(PORT, DB_URL){
        let port = (!isNaN(Number(PORT)))? PORT : 8000;
        this.configApplication()
        this.connectToDB(DB_URL)
        this.importRoutes(require("./routes/routes"));
        this.expressErrorHandler();
        this.createServer(port);
    }
    configApplication(){
        app.use(express.static("public"));
        app.use(express.json());
        app.use(express.urlencoded({extended : false}));
        app.use(cors())
    }
    createServer(port){
        let cert;
        let key;
        const server = http.createServer(app);
        server.listen(port, () => {
            console.log("server run > port : " + port);
        })
    }
    async connectToDB(url){
        mongoose.connect(url).then(() => {
            console.log("Connect to DB successfuly");
        })
    }
    importRoutes(Routes){
        app.use(Routes);
        app.use((req, res, next) => {
            return res.status(404).json({
                status : 404, 
                success : false,
                error : "Not Found",
                message : "آدرس یا صفحه ی مورد نظر یافت نشد"
            })
        })
    }
    expressErrorHandler(){
        app.use((err, req, res, next) => {
            return res.status(err.status || err.code || 500).json({
                status : err.status || err.code || 500,
                success : false,
                message : err.message,
                messages : err.messages
            })
        })
    }
}