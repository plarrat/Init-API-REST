const express = require("express")
const app = express()

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

app.listen(3010)

