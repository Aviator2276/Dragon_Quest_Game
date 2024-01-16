import * as dbAccess from "./dbAccess.js";
import * as startStage from "./startGame.mjs";
import * as teamConfigStage from "./teamConfig.mjs";
import * as teamSelectStage from "./teamSel.mjs";
import * as questionStage from "./question.mjs";
//import * as leaderboardStage from "./leaderboard.mjs"

/*
Stages in order:
1. startStage
2. teamConfigStage 
  3. teamSelectStage <In Loop>
  4. questionStage <In Loop>
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
let prelimIndex = 0;
let speedIndex = 0;



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
    } else if (gameStage === "questionStage") {
        leavePage("teamSelectStage");
        loadPage('topGUI')
        loadPage("questionStage");
        questionStage.onLoad();
    } else if (gameStage === "leaderboardStage") {
        leavePage("speedStage");
        loadPage("leaderboardStage");
        leaderboardStage.onLoad();
    }  else {
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

export function teamLogic() {
    
}

function initializeGame() {
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
export function consoleLogGameInfo() {
    let connected = setTimeout(() => dbAccess.getConnectionState(), 500);
    console.log(
        "Game State: " + gameStage + "\n" +
        "Total Teams Registered: " + totalTeam + "\n" +
        "Current Team Selected: " + currentTeam + "\n" +
        "Leaderboard: " + leaderboard + "\n" +
        "Connected to Internet: " + connected + "\n"
    );
}
function loadDatabase() {
    dbAccess.getDatabase().then((database) => {
        console.log(database);
        prelimQuestions = dbAccess.randomizeQuestions(database, true);
        speedQuestions = dbAccess.randomizeQuestions(database, false);
        answerMap = dbAccess.getAnswerMap(database);
    });
    setTimeout(() => console.log(prelimQuestions), 5000);
}

//QUESTIONS

export function getAnswer(prelim) {
    if (prelim) {
        return answerMap.get(prelimQuestions[prelimIndex][0]);
    } else {
        return answerMap.get(speedQuestions[speedIndex][0]);
    }
}

export function nextQuestion() {
    prelimIndex++;
}

export function currentQuestion() {
    if (gameStage === "questionStage") {
        return prelimQuestions[prelimIndex];
    } else {
        return(console.log("ERROR: not in correct stage stages"));
    }
}

//SCORING

const score = document.getElementById('score');

export function addPoints(points) {
    leaderboard[currentTeam - 1] += points;
    updateTeamDisplay();
}

export function changeTeam(team) {
    currentTeam = team;
    updateTeamDisplay();
}

export function getTotalTeams() {
    return team;
}

export function getTeamScore(team) {
    return leaderboard[team - 1]
}

function updateTeamDisplay() {
    score.innerHTML = "Score: " + getTeamScore(currentTeam);
}

//TIMER FUNCTIONS
const timeLimit = 30;
let timeLeft = timeLimit;

export function startTimer() {
    setInterval(() => {
        timeLeft--;
        speedStage.incrementTimer(timeLeft);

        if (timeLeft === 0) {
        timeIsUp();
        }
    }, 1000);
}