import * as gameLogic from "./game.mjs";
import * as renderer from "./renderer.mjs";

const leaderboardStage = document.getElementById("leaderboardStage");
const leaderboard = document.getElementById("leaderboard");
const transition = getLeaderboardElement('transition');

function getLeaderboardElement(elementClass) {
    return leaderboardStage.getElementsByClassName(elementClass)[0];
}

export function nextPage() {
    renderer.generateRandomDots(400);
    setTimeout(() => transition.classList.remove('transLoadPage'), 1200);
    setTimeout(() => {
        gameLogic.incrementTeam();
        gameLogic.updateGame("teamSelectStage");
    }, 2200);
}

export function onLoad() {
    transition.classList.remove('transNextPage'); 
    transition.classList.add('transLoadPage'); 
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
    setTimeout(() => {
        nextPage();
    }, 5000);
}