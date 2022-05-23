/*
Auther: Isaac Perks
Date: 04/09/2022
Description:
This will contain server related code for going between client and app.js Should contain main webpage info, routes, responses etc...
*/

const express = require('express')
const server = express()
const appClient = require('../app.js')
const path = require('path')

server.use('/paths', express.static(path.join(__dirname, '..', 'client', 'routes')))
server.use('/static', express.static(path.join(__dirname, '..', 'client', 'components')))

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'mainpage.html'))
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
    res.json(appClient.steamFetch(req.params.id));
})

server.get('/database/read/:id', (req, res) => {
    res.send({

    })

})

server.put('/database/create/:id', (req, res) => {
    res.send({

    })

})

server.post('/database/update/:id', (req, res) => {
    res.send({

    })
})

server.get('/database/delete/:id', (req, res) => {
    res.send({

    })
})

server.listen(process.env.PORT || 8081)