import * as renderer from "./renderer.mjs";
import * as dbAccess from "./dbAccess.js";
import * as startStage from "./startGame.mjs";
import * as teamConfigStage from "./teamConfig.mjs";
import * as teamSelectStage from "./teamSel.mjs";
import * as prelimStage from "./prelim.mjs";

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

let answerMap;
let prelimQuestions;
let speedQuestions;
let questionIndex = 0;


//console.log(dbAccess.callDatabase(0));
//console.log(dbAccess.checkCorrect("prelimQuestion1", "this isn't an answer"));
//console.log(dbAccess.callDatabase(0));
//console.log(dbAccess.checkCorrect("prelimQuestion1", "this isn't an answer"));


initializeGame();

export function updateGame(changeGameState) {
    //console.log(dbAccess.callDatabase(0));
    //console.log(dbAccess.checkCorrect("prelimQuestion1", "this isn't an answer"));
    if (changeGameState != "no") {
        gameStage = changeGameState;
    }
    if (gameStage === "startStage") {
        loadPage("startStage");
        startStage.onLoad();
    } else if (gameStage === "teamConfigStage") {
        leavePage("startStage");
        loadPage("teamConfigStage");
        teamConfigStage.onLoad();
    } else if (gameStage === "teamSelectStage") {
        leavePage("teamConfigStage");
        loadPage("teamSelectStage");
        teamSelectStage.onLoad();
    } else if (gameStage === "prelimStage") {
        leavePage("teamSelectStage");
        loadPage("prelimStage");
        prelimStage.onLoad();
    } else {
        console.log("Error");
    }
    consoleLogGameInfo();
}

function leavePage(pageLeave) {
    document.getElementById(pageLeave).classList.add('pageHide');
}

function loadPage(pageLoad) {
    document.getElementById(pageLoad).classList.remove('pageHide');
}

function initializeGame() {
    //leavePage("startStage");
    //updateGame("teamSelectStage");
    updateGame("startStage");
    totalTeam = 1;
    currentTeam = 1;
    leaderboard = [0,0,0,0];
    loadDatabase();
}

export function changeTotalTeam(changeTo) {
    totalTeam = changeTo;
}
export function getGameStage() {
    return gameStage;
}
function consoleLogGameInfo() {
    let connected = setTimeout(() => dbAccess.getConnectionState(), 500);
    console.log(
        "Game State: " + gameStage + "\n" +
        "Total Teams Registered: " + totalTeam + "\n" +
        "Current Team Selected: " + currentTeam + "\n" +
        "Leaderborad: " + leaderboard + "\n" +
        "Connected to Internet: " + connected + "\n"
    );
}
function loadDatabase() {
    dbAccess.getDatabase().then((database) => {
        prelimQuestions = dbAccess.randomizeQuestions(database, true);
        speedQuestions = dbAccess.randomizeQuestions(database, false);
        answerMap = dbAccess.getAnswerMap(database);
    });
    setTimeout(() => console.log(prelimQuestions), 5000);
}

export function getAnswer() {
    return answerMap.get(prelimQuestions[questionIndex][0]);
}

export function nextQuestion() {
    questionIndex++;
}

export function currentQuestion() {
    if (gameStage === "prelimStage") {
        return prelimQuestions[questionIndex];
    } else if (gameStage === "speedStage") {
        return speedQuestions[questionIndex];
    } else {
        return(console.log("ERROR: not in prelim or speed stages"));
    }
}