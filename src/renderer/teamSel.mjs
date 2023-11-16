import * as gameLogic from "./game.mjs";
import * as renderer from "./renderer.mjs";

let isLoaded = false;
const startGame = document.querySelector("#startGame");

//gameLogic.initializeGame();
export function onLoad() {
    //const element = document.getElementById('wavyTextStart');
    //setTimeout(() => element.classList.add('infinite'), 2300);
    //setTimeout(() => renderer.generateRandomDots(800), 5000);
    setTimeout(() => gameLogic.updateGame("prelimStage"), 7200);
}
