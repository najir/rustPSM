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
const express = require('express');
const fetch = require('node-fetch');
const { MongoClient } = require('mongodb');
const dbURL = 'mongodb://localhost:27017';
const dbClient = new MongoClient(dbURL);
const dbName = 'rustPSMdb';

async function dbInit() {
    await dbClient.connect();
    console.log('Client connected');
    const db = dbClient.db(dbName);
    const rustStats = db.collection('rustStats');
    const finalStats = db.collection('finalStats');
    finalStats.createIndex({ index: 1 });
    return 'complete';
}

function steamFetch(appID, steamID, rustDB) {
    fetch('http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appID}&key=${proccess.env.steamAPI}&steamid=${steamID}')
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else { throw err }
        })
        .then((json) => {
            let doc = json;
            rustDB.insertOne(doc);
            //send to db? Need to see data format for rust to then parse
            console.log("inserted document into mongo; ${doc}");
        })

}

function statProcess(steamID, rustDB, finalDB) {
    let kills = parseInt(rustDB.distinct("kill_player", { "steamID": steamID }));
    let fired = parseInt(rustDB.distinct("bullet_fired", { "steamID": steamID }));
    let hits = parseInt(rustDB.distinct("bullet_hit_player", { "steamID": steamID }));
    let headshots = parseInt(rustDB.distinct("headshot", { "steamID": steamID }));

    let hs = headshots / hits;
    hs /= 10
    let accuracy = hits / fired;
    let final = hs + accuracy;
    final *= 100;
    finalDB.insertOne({ steamID: final });
}