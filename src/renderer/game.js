const fs = require('fs');
const csv = require('csv-parser');
const needle = require("needle");
const urlDatabase = "https://docs.google.com/spreadsheets/d/1gnjt-bU31ZbAc9wa5b57nI-_Gfnv3ac6sD9JPOQHCHs/gviz/tq?tqx=out:csv&sheet=answerKey1";
let database = './db/data.csv';

let gameState;
let totalTeam;
let currentTeam;
let answerKey = [];
let prelimQuestion = [];
let speedQuestion = [];
let leaderboard;

export function initializeGame() {
  gameState = "startGame";
  totalTeam = 0;
  currentTeam = 1;
  leaderboard = 0;
}

async function getDatabase(answerKey) {
  /* Get LOCAL database
  fs.createReadStream(database)
    .pipe(csv({headers: false}))
    .on("data", (data) => {
        answerKey.push(data);
    })
    .on("done", (err) => {
        if (err) console.log("An error has occurred");
        else 
            prelimQuestion = answerKey.slice(0, 50);
            speedQuestion = answerKey.slice(50, 100);
    })
    .on("end", function () {
        console.log("finished");
    });*/
  // Get ONLINE database
  const customPromise = new Promise((resolve, reject) => {needle
    .get(urlDatabase)
    .pipe(csv({headers: false}))
    .on("data", (data) => {
        answerKey.push(data);
    })
    .on("done", (err) => {
        if (err) reject(new Error("An error has occurred"));
        else
            resolve(answerKey);
            console.log("finished");
            //console.log(prelimQuestion);
    });
    });
    
    return customPromise;
}

getDatabase(answerKey).then(data => {
    prelimQuestion = data.slice(0, 50);
    speedQuestion = data.slice(50, 100);
    console.log(prelimQuestion);
})
    .catch(err => {
    console.log(err)
})

export function readTable() {
    console.log(prelimQuestion);
}

export function changeGameState(changeTo) {
    gameState = changeTo;
    console.log*(gameState);
}
