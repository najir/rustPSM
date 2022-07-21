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

//Calls the same as db request. App will check if exists, update/create data and respond with json values needed for whoever made the call.
server.get('/api/:id', async (req, res) => {
    await appClient.dbRead(req.params.id).then(async (data) => { res.status(200).json(data) })

})

//Database calls, currently unused but may be accessed for making admin changes to db on client side via url calls
server.get('/database/read/:id', async (req, res) => {
    await appClient.dbRead(req.params.id).then(async (data) => { res.status(200).json(data) })
})

server.put('/database/create/:id', (req, res) => {
    let response = appClient.dbCreate(req.params.id);
    res.send({
        response
    })
})

server.post('/database/update/:id', (req, res) => {
    let response = appClient.dbUpdate(req.params.id);
    res.send({
        response
    })
})

server.get('/database/delete/:id', (req, res) => {
    let response = appClient.dbDelete(req.params.id);
    res.send({
        response
    })
})

server.listen(process.env.PORT || 8081)