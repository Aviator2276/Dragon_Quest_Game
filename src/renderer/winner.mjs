import * as gameLogic from "./game.mjs";
import * as renderer from "./renderer.mjs";

const winnerStage = document.getElementById("winnerStage");
const podium = document.getElementById("podium");
const reset = document.getElementById('resetButton');
const transition = getWinnerElement('transition');
const winSound = new Audio('../static/assets/sound/win.wav');

function getWinnerElement(elementClass) {
    return winnerStage.getElementsByClassName(elementClass)[0];
}

reset.onclick = () => {
    renderer.generateRandomDots(400)
    setTimeout(() => transition.classList.add('transNextPage'), 1200)
    setTimeout(() => location.reload(), 2200);
}

export function onLoad() {
    podium.innerHTML = '';
    transition.classList.remove('transNextPage'); 
    transition.classList.add('transLoadPage');
    for (let i = 0; i < gameLogic.getTotalTeams(); i++) {
        podium.innerHTML += `
        <div id="rank` + (i + 1) + `" ${(i >= 3) ? '' : 'class="podiumStyle"'}>
            <div class="${(i >= 3) ? '' : 'teamCircle'} place` + (i + 1) + `Style">
                <div id="place` + (i + 1) + `" ${(i >= 3) ? '' : 'class="teamText"'}>Team ` + gameLogic.getLeaderboard("team", i) + `</div>
                <div id="score` + (i + 1) + `" ${(i >= 3) ? '' : 'class="pointText"'}>` + gameLogic.getLeaderboard("score", i) + ` Points</div>
            </div>
        </div>
        `
    }
    setTimeout(() => transition.classList.remove('transLoadPage'), 1000);
    setTimeout(() => {
        winSound.play()
        renderer.startConfetti();
    }, 7000);
    setTimeout(() => {
        renderer.generateRandomDots(400);
        setTimeout(() => transition.classList.add('transNextPage'), 1200);
        setTimeout(() => location.reload(), 2200);
    }, 60000);
}