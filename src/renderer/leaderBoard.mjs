import * as gameLogic from "./game.mjs";

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

/*
<div class="firstPlace TeamCard">
    <span id="firstPlaceTeam">
        TEAM 1
    </span>
    <span id="firstPlacePoints" class="placePoints">
        123 POINTS
    </span>
</div>
*/

function onLoad() {
    for (let i = 1; i < gameLogic.getTotalTeams(); i++) {
        leaderboard.innerHTML += `
        <div class="firstPlace TeamCard">
            <span id="firstPlaceTeam">
                TEAM ` + gameLogic.getTeamScore(i) + `
            </span>
            <span id="firstPlacePoints" class="placePoints">
                123 POINTS
            </span>
        </div>
        `
    }
    /*
    first.classList.remove("hidden");
    if (gameLogic.getTotalTeams() >= 2) {
        second.classList.remove("hidden");
        
        if (gameLogic.getTotalTeams() >= 3) {
            third.classList.remove("hidden");
            
            if (gameLogic.getTotalTeams() >= 4) {
                fourth.classList.remove("hidden");
            }
        }
    }
    
    
    first.innerHTML = "1st: " +gameLogic.getTeamScore(1);
    second.innerHTML = "2nd: " +gameLogic.getTeamScore(2);
    third.innerHTML = "3rd:" +gameLogic.getTeamScore(3);
    fourth.innerHTML = "4th" + gameLogic.getTeamScore(4);
    */
}

function orderTeams() {
    leaderboardStage
}