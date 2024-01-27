import * as dbAccess from "./dbAccess.js";
import * as startStage from "./startGame.mjs";
import * as teamConfigStage from "./teamConfig.mjs";
import * as teamSelectStage from "./teamSel.mjs";
import * as questionStage from "./question.mjs";
import * as leaderboardStage from "./leaderBoard.mjs";
import * as winnerStage from "./winner.mjs";

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
let questionStageFirstQuestion = true;

initializeGame();

export function updateGame(changeGameState) {
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
        leavePage("leaderboardStage");
        loadPage("teamSelectStage");
        teamSelectStage.onLoad();
        questionStageFirstQuestion = true;
    } else if (gameStage === "questionStage") {
        leavePage("teamSelectStage");
        loadPage('topGUI')
        loadPage("questionStage");
        questionStage.onLoad(questionStageFirstQuestion);
        questionStageFirstQuestion = false;
    } else if (gameStage === "leaderboardStage") {
        leavePage("questionStage");
        if (currentTeam == totalTeam) {
            loadPage("winnerStage");
            winnerStage.onLoad();
        }
        else {
            loadPage("leaderboardStage");
            leaderboardStage.onLoad();
        }
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

function initializeGame() {
    updateGame("startStage");
    totalTeam = 1;
    currentTeam = 1;
    leaderboard = [-100,-100,-100,-100];
    loadDatabase();
}

export function setTeams() {
    for (let i = 0; i < totalTeam; i++) {
        leaderboard[i] = 0;
    }
}

export function changeTotalTeam(changeTo) {
    totalTeam = changeTo;
}
export function getGameStage() {
    return gameStage;
}
export function consoleLogGameInfo() {
    const connected = dbAccess.getConnectionState()
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
    //setTimeout(() => console.log(prelimQuestions.shift()), 5000);
    // The .shift() was used to prevent the question that had other questions combined into it. This did not work.
}

//Questions

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

//Scoring

const score = document.getElementById('score');

export function addPoints() {
    leaderboard[currentTeam - 1] += 20;
    updateTeamDisplay();
}

export function removePoints() {
    if (getTeamScore(currentTeam) >= 0) {
        leaderboard[currentTeam - 1] -= 10;
    }
    updateTeamDisplay();
}

export function incrementTeam(team) {
    currentTeam += 1;
}

export function getTotalTeams() {
    return totalTeam;
}

export function getTeamScore(team) {
    return leaderboard[team - 1]
}

export function getLeaderboard(type, rank) {
    let teamsScore = leaderboard.map((score, index) => ({ team: index + 1, score }));
    teamsScore.sort((a, b) => b.score - a.score);
    console.log(teamsScore);
    if (type == "team") {
        return teamsScore[rank].team;
    } else if (type == "score") {
        return teamsScore[rank].score;
    } else {
        return "Error";
    }
}

export function updateTeamDisplay() {
    score.innerHTML = "Score: " + getTeamScore(currentTeam);
}

export function getCurrentTeam() {
    return currentTeam;
}

//Timing

const timeLimit = 3000;
let timeLeft;
let timerActive = false;
let timerCreated = false;

export function startTimer() {
    timeLeft = timeLimit;
    timerActive = true;
    if (!timerCreated) {
        timerCreated = true;
        setInterval(() => {
            if (timerActive) {
                timeLeft--;
                if (timerActive) {
                    questionStage.incrementTimer((timeLeft / 100.0).toFixed(2));
                }
                
            }
            if (timeLeft <= 0) {
                timeLeft = timeLimit;
                setClicksEnabled(false);
                pauseTimer();
                nextQuestion();
                questionStage.nextPage();
            }
        }, 10);
    }
}

export function pauseTimer() {
    timerActive = false;
}

export function resumeTimer() {
    timerActive = true;
}


function timeIsUp() {
    setClicksEnabled(false);
    timerActive = false;
    questionStage.nextPage();
}

//Click Enable

let clicksEnabled = true;

export function getClicksEnabled() {
    return clicksEnabled;
}

export function setClicksEnabled(value) {
    clicksEnabled = value;
}