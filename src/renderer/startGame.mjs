import * as gameLogic from "./game.js";

export function onLoad() {
    const element = document.getElementById('wavyTextStart');
    setTimeout(() => element.classList.add('infinite'), 2300);
}

startGame.onclick = () => {
    gameLogic.changeGameState("startGame");
    renderer.generateRandomDots(800);
    setTimeout(() => window.open('teamConfig.html','_self',false), 2200);
}