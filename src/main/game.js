var csv = require('jquery-csv');
let gameState;

let answerKey;
let totalTeam;
let currentTeam;
let prelimQuestion;
let speedQuestion;
let leaderboard;

function initializeGame() {
    gameState = "startGame";
    totalTeam = 0;
    currentTeam = 1;
    /*try {
        answerKey = new Database(path.join(__dirname, '../../db/answerKey.csv'))
    } catch (err) {
        console.log("Failed to load database: \n", err)
    }*/
}


module.exports = {
    initializeGame,
};