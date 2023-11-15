import * as gameLogic from "./game.mjs";
import * as renderer from "./renderer.mjs";

const startGame = document.querySelector("#startGame");

//gameLogic.initializeGame();

window.addEventListener('load', function () {
    const element = document.getElementById('wavyTextStart');
    setTimeout(() => element.classList.add('infinite'), 2300);
    setTimeout(() => renderer.generateRandomDots(800), 5000);
    setTimeout(() => gameLogic.updateGame("no"), 7200);
});
