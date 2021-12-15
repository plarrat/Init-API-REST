const express = require("express")
const app = express()
const users = require("./modules/users")
const cors = require("cors")

app.use(cors())

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

app.listen(3010)

