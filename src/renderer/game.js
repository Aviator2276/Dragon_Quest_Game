const fs = require('fs');
const csv = require('csv-parser');
const needle = require("needle");
const urlDatabase = "https://docs.google.com/spreadsheets/d/1gnjt-bU31ZbAc9wa5b57nI-_Gfnv3ac6sD9JPOQHCHs/gviz/tq?tqx=out:csv&sheet=answerKey1";
let database = './db/data.csv';

let gameState;
let totalTeam;
let currentTeam;
let leaderboard;
let prelimQuestion = [];
let speedQuestion = [];

export function initializeGame() {
  gameState = 1;
  totalTeam = 0;
  currentTeam = 1;
  leaderboard = [0,0,0,0];
  console.log(readTable(1));
  console.log
}

async function getDatabase() {
  return new Promise((resolve, reject) => {
    let answerKeyRaw = [];
    needle
    .get(urlDatabase)
    .pipe(csv({headers: false}))
    .on("data", (data) => {
        answerKeyRaw.push(data);
    })
    .on("done", (err) => {
        if (err) reject(new Error("An error has occurred when retrieving online database. Trying local database"));
        else
            resolve(answerKeyRaw);
    }).on("end", function () {
        console.log("Online Database Success");
    })/*.catch(() => {
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
        });
    });*/
    });
}

export async function readTable(tableSelect) {
    const answerKey = await getDatabase();
    prelimQuestion = answerKey.slice(0, 50);
    speedQuestion = answerKey.slice(50, 100);
    if (tableSelect === 0) {
        return answerKey;
    } else if (tableSelect === 1) {
        return prelimQuestion;
    } else if (tableSelect === 2) {
        return speedQuestion;
    } else {
        return "Error retrieving database.";
    }
}

export function changeTotalTeam(total) {
    totalTeam = total;
}

export function changeGameState(changeTo) {
    gameState = changeTo;
}

export function getGameInfo() {
    console.log(
        "Game State: " + gameState + "\n" +
        "Total Teams Registered: " + totalTeam + "\n" +
        "Current Team Selected: " + currentTeam + "\n" +
        "Leaderborad: " + leaderboard + "\n"
    );
}