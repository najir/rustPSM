/*
Auther: Isaac Perks
Date: 04/09/2022
Description:
This will contain server related code for going between client and app.js Should contain main webpage info, routes, responses etc...
*/

const express = require('express')
const server = express()
const app = require('./app.js')


server.get('/', (req, res) => {
    res.send({
        message: 'hello'
    })
    res.sendFile('./client/mainpage.html')
})
server.get('/api/test', (req, res) => {
    res.send({
        message:'hello'
    })
})

server.post('/api/register', (req, res) => {
    res.send({
        message:'test'
    })
})

server.get('/api/user/:id', (req, res) => {
    res.send({
        app.steamFetch(req.params.id)
    })
})

server.listen(process.env.PORT || 8081)