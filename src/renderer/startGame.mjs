import * as gameLogic from "./game.mjs";
import * as renderer from "./renderer.mjs";
let isLoaded = false;
let startGame = document.getElementById('startGame');

export function onLoad() {
    let element = document.getElementById(gameLogic.getGameStage()).getElementsByClassName('wavyTextStart')[0];
    setTimeout(() => element.classList.add('infiniteWave'), 2300);
    isLoaded = true;
}

startGame.onclick = () => {
    if (isLoaded = true) {
        renderer.generateRandomDots(400);
        setTimeout(() => gameLogic.updateGame("teamConfigStage"), 2200);
        isLoaded = false;
    }
}