import * as renderer from "./renderer.mjs";
import * as startStage from "./startGame.mjs";
import * as teamConfigStage from "./teamConfig.mjs";
import * as teamSelectStage from "./teamSel.mjs";
//const fs = require('fs');
//const csv = require('csv-parser');
//const needle = require("needle");
//const urlDatabase = "https://docs.google.com/spreadsheets/d/1gnjt-bU31ZbAc9wa5b57nI-_Gfnv3ac6sD9JPOQHCHs/gviz/tq?tqx=out:csv&sheet=answerKey1";
let database = './db/data.csv';

/*
Stages in order:
1. startStage
2. teamConfigStage 
  3. teamSelectStage <In Loop>
  4. prelimStage <In Loop>
  5. speedStage <In Loop>
  6. leaderboardStage <In Loop>
7. winnerStage
8. endStage
*/

let gameStage;
let totalTeam;
let currentTeam;
let leaderboard;
let prelimQuestion = [];
let speedQuestion = [];

const startGame = document.querySelector("#startGame");

initializeGame();

while (gameStage != "endStage") {
    getGameInfo();
    if (gameStage === "startStage") {
        loadPage("startStage");
    } else if (gameStage === "teamConfigStage") {
        leavePage("startStage", false);
        loadPage("teamConfigStage");
    } else if (gameStage === "teamSelectStage") {
        leavePage("teamConfigStage", false);
        loadPage("teamConfigStage");
    }
}

function leavePage(gameStage, reloadPage) {
    renderer.generateRandomDots(800);
    if (reloadPage) {
        transition.classList.add('transStart');
        setTimeout(() => location.reload(), 700);
    } else {
        document.getElementById(gameStage).classList.add('pageHide');
    }
}

function loadPage(gameStage) {
    document.getElementById(gameStage).classList.remove('pageHide');
    gameStage.loadPage();
}

function initializeGame() {
  gameStage = "startStage";
  totalTeam = 0;
  currentTeam = 1;
  leaderboard = [0,0,0,0];
  addClassToElements('pageHide', document.getElementById('teamConfigStage'), document.getElementById('teamSelectStage'));
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


export function getGameInfo() {
    console.log(
        "Game State: " + gameStage + "\n" +
        "Total Teams Registered: " + totalTeam + "\n" +
        "Current Team Selected: " + currentTeam + "\n" +
        "Leaderborad: " + leaderboard + "\n"
    );
}