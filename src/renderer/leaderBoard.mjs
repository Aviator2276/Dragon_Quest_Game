import * as gameLogic from "./game.mjs";
import * as renderer from "./renderer.mjs";

const leaderboardStage = document.getElementById("leaderboardStage");
const leaderboard = document.getElementById("leaderboard");


function addClassToElements(className, ...elements) {
    elements.forEach(element => element.classList.add(className));
}

function removeClassFromElements(className, ...elements) {
    elements.forEach(element => element.classList.remove(className));
}

function getLeaderboardElement(elementClass) {
    return leaderboardStage.getElementsByClassName(elementClass)[0];
}

export function nextPage() {
    renderer.generateRandomDots(400);
    setTimeout(() => {
        gameLogic.incrementTeam();
        gameLogic.updateGame("teamSelectStage");
    }, 2200);
}

export function onLoad() {
    leaderboard.innerHTML = '';
    for (let i = 0; i < gameLogic.getTotalTeams(); i++) {
        leaderboard.innerHTML += `
        <div class="team` + (i + 1) + `Place TeamCard">
            <span id="firstPlaceTeam">
                TEAM ` + gameLogic.getLeaderboard("team", i) + `
            </span>
            <span id="firstPlacePoints" class="placePoints">
                ` + gameLogic.getLeaderboard("score", i) + ` POINTS
            </span>
        </div>
        `
    }
    const transition = document.getElementById(gameLogic.getGameStage()).getElementsByClassName('transition')[0];
    transition.classList.remove('transNextPage'); 
    transition.classList.add('transLoadPage'); 
    setTimeout(() => {
        nextPage();
    }, 5000);
}

function orderTeams() {
    leaderboardStage
}