import * as gameLogic from "./game.mjs";
import * as renderer from "./renderer.mjs";

let isLoaded = false;
const startGame = document.querySelector("#startGame");

//gameLogic.initializeGame();
export function onLoad() {
    const element = document.getElementById('wavyTextStart');
    const transition = document.getElementById(gameLogic.getGameStage()).getElementsByClassName('transition')[0];
    transition.classList.add('transLoadPage');
    setTimeout(() => transition.classList.remove('transLoadPage'), 2300);
    setTimeout(() => element.classList.add('infinite'), 2300);
    setTimeout(() => renderer.generateRandomDots(800), 5000);
    setTimeout(() => transition.classList.remove('transNextPage'), 7200);
    setTimeout(() => gameLogic.updateGame("prelimStage"), 7200);
}
