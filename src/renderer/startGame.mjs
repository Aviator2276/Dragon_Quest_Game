import * as gameLogic from "./game.js";
import * as renderer from "./renderer.mjs";

const startGame = document.querySelector("#startGame");


window.addEventListener('load', function () {
    const element = document.getElementById('wavyTextStart');
    setTimeout(() => element.classList.add('infinite'), 2300);
});
startGame.onclick = () => {
    gameLogic.changeGameState("startGame");
    renderer.generateRandomDots(800);
    setTimeout(() => window.open('teamConfig.html','_self',false), 2200);
}