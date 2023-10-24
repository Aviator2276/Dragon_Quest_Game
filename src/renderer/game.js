const fs = require('fs');
const csv = require('csv-parser');
const needle = require("needle");
const urlDatabase = "https://docs.google.com/spreadsheets/d/1gnjt-bU31ZbAc9wa5b57nI-_Gfnv3ac6sD9JPOQHCHs/gviz/tq?tqx=out:csv&sheet=answerKey1";
let database = './db/data.csv';

let gameState;
let totalTeam;
let currentTeam;
let prelimQuestion = [];
let speedQuestion = [];
let leaderboard;

export function initializeGame() {
  gameState = "startGame";
  totalTeam = 0;
  currentTeam = 1;
  leaderboard = 0;
  getDatabase();
}

async function getDatabase() {
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
  const promise = () => new Promise((resolve, reject) => {
    let answerKeyRaw = [];
    needle
    .get(urlDatabase)
    .pipe(csv({headers: false}))
    .on("data", (data) => {
        answerKeyRaw.push(data);
    })
    .on("done", (err) => {
        if (err) reject(new Error("An error has occurred"));
        else
            resolve(answerKeyRaw);
            //console.log(prelimQuestion);
    }).on("end", function () {
        console.log("finished");
    });
    });
    
    const answerKey = await promise();
    prelimQuestion = answerKey.slice(0, 50);
    speedQuestion = answerKey.slice(50, 100);
    console.log(answerKey);
}

export function readTable() {
    console.log(prelimQuestion[1]);
    console.log(answerKey);
}

export function changeGameState(changeTo) {
    gameState = changeTo;
    console.log(gameState);
}
