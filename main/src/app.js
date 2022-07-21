/* 
Auther: Isaac Perks
Date: 04/09/2022
Description:
rustPSM main application code. This application will pull data from steamAPI and process play information. Processed data will be sent to a client
VUE based page. Details will be added as code is written...
*/

require('dotenv').config();
const https = require('https');
const { MongoClient } = require('mongodb');
const dbURL = "mongodb+srv://najir:Iperks101@cluster0.ss2te.mongodb.net/?retryWrites=true&w=majority" //running this through config.env was causing errors, temp usage via direct input
const dbClient = new MongoClient(dbURL);


function steamFetch(steamID) {
    console.log('testing2')
    let finalData = {}
    return new Promise((resolve, reject) => {
        console.log('testing3')
        https.get({
            hostname: `api.steampowered.com`,
            path: `/ISteamUserStats/GetUserStatsForGame/v0002/?appid=252490&key=D23B60AFE19580CBC774B89844D59144&steamid=${steamID}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }, (res) => {
            console.log(`statusCode: ${res.statusCode}`);

            res.on('data', d => {
                finalData = d;
                console.log(JSON.parse(d).playerstats.stats.find(function (e) { return e.name == 'headshot' }).value)
                resolve(finalData)
            }).on('error', error => {
                console.error(error);
                reject(error);
            });
        });
    });
}


async function statProcess(steamID) {
    let response = [];
    await steamFetch(steamID).then((data) => {
        let finalObject = [];
        console.log('stat process called')
        if(data) {
            console.log(data)
            let parsedRes = JSON.parse(data).playerstats.stats;
            let headshot = parsedRes.find(function (e) { return e.name == 'headshot' }).value / parsedRes.find(function (e) { return e.name == 'bullet_hit_player' }).value
            let kd = parsedRes.find(function (e) { return e.name == 'kill_player' }).value / parsedRes.find(function (e) { return e.name == 'deaths' }).value
            let hitshot = parsedRes.find(function (e) { return e.name == 'bullet_hit_player' }).value / parsedRes.find(function (e) { return e.name == 'bullet_fired' }).value
            let rating = (headshot * 10) + (kd * 1.5) + (hitshot * 5)
            console.log('parsed')
            response.push({
                '_id': steamID, 'name': steamID, 'headshot': headshot, 'kd': kd, 'hitshot': hitshot, 'rating': rating
            })
            console.log('creating')
 
        }
    });
    await dbCreate(response)
    return response;
}

//calling function should account for returned errors, data needs to be searchable value in db(should be steamID)
async function dbRead(data) {
    let finalResult = {}
    let stringData = data.toString();
    try {
        if (data.length == 17) {
            await statProcess(data).then((fetchData) => {
                if (fetchData) {
                    console.log('testing1')
                }
            })
            await dbClient.connect();
            console.log('Client connected');
            let collection = dbClient.db('rustPSM').collection('userData');
            console.log('find one requested: ' + stringData)
            finalResult = await collection.findOne({ _id: stringData })
        }
    } finally { return finalResult;}
}

async function createHelper(data) {
    console.log(data[0])
    let collection = dbClient.db('rustPSM').collection('userData');
    if (data) {
        let dataExists = await collection.findOne(data.name)
        console.log(dataExists)
        if (dataExists) {//this mostly likely will not process the way i want it too
            await collection.updateOne({ name: data[0].name }, { $set : data[0] });
            console.log('Updated one')
            finalResult = true;
        }
        else {
            await collection.insertOne(data[0]);
            console.log('inserted one')
            finalResult = true;
        }
    }
}

async function dbCreate(data) {
    let finalResult = false
    try {
        await dbClient.connect();
        console.log('client connnected');
        await createHelper(data);
        console.log('client closed')
        await dbClient.close();
        return finalResult;
    } finally {
       // console.log('client closed')
       // await dbClient.close();
     //   return finalResult;
    }
}

async function dbUpdate(data) {
    let finalResult = false
    try {
        await dbClient.connect();
        console.log('client connected');
        let collection = dbClient.db('rustPSM').collection('userData');
        if (data) {
            let dataExists = collection.findOne(data.name)
            if (dataExists) { // most likely needs changed
                collection.updateOne(data.name, data);
                finalResult = true
            }
        }
    } finally {
        await dbClient.close();
        return finalResult;
    }
}

async function dbDelete(data) {
    finalResult = false
    try {
        await dbClient.connect();
        console.log('client connected');
        let collection = dbClient.db('rustPSM').collection('userData');
        if (data.length == 17 && data.isInteger()) {
            let dataExists = collection.findOne(data)
            if (dataExists) {//most likely needs changed
                collection.deleteOne(data)
                finalResult = true
            }
        }
    } finally {
        await dbClient.close();
        return finalResult;
    }
}

module.exports = {dbCreate, dbDelete, dbRead, dbUpdate}