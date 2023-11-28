import * as gameLogic from "./game.mjs";

const leaderboardStage = document.getElementById("leaderboardStage");
const first = getLeaderboardElement('first');
const second = getLeaderboardElement('second');
const third = getLeaderboardElement('third');
const fourth = getLeaderboardElement('fourth');


function addClassToElements(className, ...elements) {
    elements.forEach(element => element.classList.add(className));
}

function removeClassFromElements(className, ...elements) {
    elements.forEach(element => element.classList.remove(className));
}

function getLeaderboardElement(elementClass) {
    return leaderboardStage.getElementsByClassName(elementClass)[0];
}

function onLoad() {
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
}

function orderTeams() {
    leaderboardStage
}