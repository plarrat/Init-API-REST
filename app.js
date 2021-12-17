const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const userModel = require("./schemas/users")
const bodyParser = require("body-parser")
const categoryModel = require("./schemas/category")
const {apiKey} = require("./package.json")
const jwtLib = require("jsonwebtoken")
const db = mongoose.connect("mongodb://localhost/initMongo",{useNewUrlParser:true})
const {jwtSecret} = require("./package.json")




app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
// app.use((req,res,next)=>{
//     if(!req.headers["x-api-key"] && req.headers["x-api-key"] !== apiKey)
//         res.status(401).end("No Api Key")   
//     return next()
// })

// app.use(async (req,res,next)=>{
//     const jwt = req.headers.authentification.replace("Bearer ", "")
//     const validity = await jwtLib.verify(jwt, jwtSecret)
//     const expiredDate = validity.iat;
//     const dateNow = Date.now()
//     if(dateNow <= expiredDate)
//         // console.log("Date expirée")
//         res.status(401).end("Expired Token")
//     return next();
    
    
// })

app.get("/", function(req,res){
    res.writeHead(200, {"Content-Type": "text/html"})
    res.end("<h1>Bienvenue</h1>")
})

app.get("/page", function(req,res){
    res.writeHead(200, {"Content-Type": "text/html"})
    res.end(`<h1>Bienvenue sur la page d'accueil</h1>`)
})

app.get("/page/:numPage", function(req,res){
    const {numPage} = req.params

    res.writeHead(200, {"Content-Type": "text/html"})
    res.end(`<h1>Bienvenue Nodemon npm start sur la page numero : ${numPage}</h1>`)
})

app.get("/user/:id", function(req,res){
    const {id} = req.params
    
    if(isNaN(parseInt(id))){
        res.writeHead(400, {"Content-Type": "text/html"})
        res.end("Wrong id format")
        return null
    }
    let selectUser = users.filter(user=>(user.id === parseInt(id)))
    
    if(selectUser.length === 0){
        res.writeHead(404, {"Content-Type": "text/html"})
        res.end("No user found")
        return null
    }
        
    res.status(200).json(selectUser[0])
})

app.get("/user", async function(req,res){
    
    res.status(200).json({id:datas["_id"]})
})

app.post("/user", async function(req,res){
    const {nom, prenom, age, category} = req.body
    
    const datas = await userModel.create({
        nom,
        prenom,
        age,
        category
    })
    res.status(201).json({id:datas["_id"]})
})

app.put("/user/:id", async function(req,res){
   // La modification d'un utilisateur
})

app.delete("/user/:id", async function(req,res){
   // La suppression
})

app.get("/category", async function(req,res){
    categoryModel.find({}, function(err, categories){
        res.status(200).json(categories)
    })
})

module.exports = app
