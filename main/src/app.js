/* 
Auther: Isaac Perks
Date: 04/09/2022
Description:
rustPSM main application code. This application will pull data from steamAPI and process play information. Processed data will be sent to a client
VUE based page. Details will be added as code is written...
*/


require("./data/$$$");
require('./client/$$$');
require('./api/$$$');
require('./config/dotenv').config();
const express = require('./express');
const fetch = require('./node-fetch');
const { MongoClient } = require('mongodb');
const dbURL = 'mongodb://localhost:27017';
const dbClient = new MongoClient(dbURL);
const dbName = 'rustPSMdb';

async function dbInit() {
    await dbClient.connect();
    console.log('Client connected');
    const db = dbClient.db(dbName);
    const collection = db.collection('documents');
    return 'complete';
}

function steamFetch(appID, steamID) {
    fetch('http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appID}&key=${proccess.env.steamAPI}&steamid=${steamID}')
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            else { throw err }
        })
        .then((json) => {
            //send to db? Need to see data format for rust to then parse
            console.log(json);
        })

}





dbInit();
//steamFetch(process.env.appID, clientSteamID);
