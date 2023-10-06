//import fs from 'fs';
//import csvTool from 'jquery-csv';
const fs = require('fs');
const csvTool = require('jquery-csv');
let database = './db/answerKey.csv';
let gameState;

let answerKey = [];
let totalTeam;
let currentTeam;
let prelimQuestion;
let speedQuestion;
let leaderboard;

function initializeGame() {
    gameState = "startGame";
    totalTeam = 0;
    currentTeam = 1;
    leaderboard = 0;
    fs.readFile(database, 'UTF-8', (err, fileContent) => {
    if (err) { console.log(err); }
    csvTool.toArrays(fileContent, {}, (err, data) => {
        if (err) { console.log(err); }
        for (let i = 0, len = data.length; i < len; i++) {
            answerKey[i] = data[i];
        }
        prelimQuestion = answerKey.slice(0, 5);
        speedQuestion = answerKey.slice(5, 25);
    });
    });
}


function changeGameState(changeTo) {
    gameState = changeTo;
    console.log*(gameState);
}
 
module.exports = {
    initializeGame,
    changeGameState,
};