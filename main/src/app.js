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
const dbURL = process.env.dbURI;
const dbClient = new MongoClient(dbURL);

async function dbO() {
    try {
        await dbClient.connect();
        console.log('Client connected');
    }
}

//Uses get request to grab json data from steam api call. Returns data to caller
function steamFetch(steamID) {
    https.get('http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${process.env.appID}&key=${proccess.env.steamAPI}&steamid=${steamID}')
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else { throw err }
        })

}

//Function calls steamFetch, sorts and parses JSON, gathers needed data, calls db functions and returns true or err when complete
function statProcess(steamID, rustDB, finalDB) {
    let response = err;
    let data = steamFetch(steamID);
    let finalObject = {};
    if (data) {
        //process data and set it to final object
        //jsonify object and make dbcreate calls. This will create or update the db and end. This will allow dbread to finish
        response = dbCreate(finalObject.json);
        let parsedRes = JSON.parse(repsonse);
        let headshot = parsedRes.headshot / parsedRes.bullet_hit_player
        let kd = parsedRes.kill_player / parsedRes.deaths
        let hitshot = parsedRes.bullet_hit_player / parsedRes.bullet_fired
        let rating = (headshot*10) + (kd*1.5) + (hitshot*5)
        finalObject.append(steamID)
        finalObject.append(headshot)
        finalObject.append(kd)
        finalObject.append(hitshot)
        finalObject.append(rating)
        self.dbCreate(finalObject)
    }
    return response;
}

//Data base calls, need to actually find out what order to enter these is....

//calling function should account for returned errors, data needs to be searchable value in db
async function dbRead(data) {
    let finalResult = err
    try {
        await dbClient.connect();
        console.log('Client connected');
        let collection = dbClient.collections('userData');
        if (data.length == 17 && data.isInteger()) {
            if (statProcess(data)) {
                //access db and return the data found after statprocess is done
                //set finalResult = to the data found in db as a json object
                finalResult = await collection.findOne(data)
            }
        }
    } finally {
        await dbClient.close();
        return finalResult;
    }
}

async function dbCreate(data) {
    let finalResult = err
    try {
        await dbClient.connect();
        console.log('client connnected');
        let collection = dbClient.collections('userData');
        if (data) {
            let dataExists = colllection.findOne(data.steamID)
            if (dataExists) {
                collection.updateOne(data.steamID, data);
                finalResult = true;
            }
            else {
                collection.insertOne(data);
                finalResult = true;
                //add to db
            }
        }
    } finally {
        await dbClient.close();
        return finalResult;
    }
}

async function dbUpdate(data) {
    let finalResult = err
    try {
        await dbClient.connect();
        console.log('client connected');
        let collection = dbClient.collections('userData');
        if (data) {
            let dataExists = collection.findOne(data.steamID)
            if (dataExists) {
                //Requires full data, will run update in db to post new information
                collection.updateOne(data.steamID, data);
                finalResult = true
            }
        }
    } finally {
        await dbClient.close();
        return finalResult;
    }
}

async function dbDelete(data) {
    finalResult = err
    try {
        await dbClient.connect();
        console.log('client connected');
        let collection = dbClient.collections('userData');
        if (data.length == 17 && data.isInteger()) {
            let dataExists = collection.findOne(data)
            if (dataExists) {
                collection.deleteOne(data)
                //db delete
                finalResult = true
            }
        }
    } finally {
        await dbClient.close();
        return finalResult;
    }
}