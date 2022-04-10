/*
Auther: Isaac Perks
Date: 04/09/2022
Description:
API code to be exported goes here. This will contain server related code for going between client and app.js Should contain main webpage info, routes, responses etc...
*/

require('../express')
const server = express()

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

server.listen(process.env.PORT || 8081)