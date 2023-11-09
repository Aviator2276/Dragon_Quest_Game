import * as gameLogic from "./game.js";
import * as renderer from "./renderer.mjs";

const startGame = document.querySelector("#startGame");

gameLogic.initializeGame();

window.addEventListener('load', function () {
    const element = document.getElementById('wavyTextStart');
    setTimeout(() => element.classList.add('infinite'), 2300);
    setTimeout(() => renderer.generateRandomDots(800), 5000);
    setTimeout(() => window.open('teamSel.html','_self',false), 7200);
});